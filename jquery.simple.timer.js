/*
* jQuery-Simple-Timer
*
* Creates a countdown timer.
*
* Example:
*   $('.timer').startTimer();
*
*/

(function (factory) {
  // Using as a CommonJS module
  if(typeof module === "object" && typeof module.exports === "object") {
    // jQuery must be provided as argument when used
    // as a CommonJS module.
    //
    // For example:
    //   let $ = require("jquery");
    //   require("jquery-simple-timer")($);
    module.exports = function(jq) {
      factory(jq, window, document);
    }
  } else {
    // Using as script tag
    //
    // For example:
    //   <script src="jquery.simple.timer.js"></script>
    factory(jQuery, window, document);
  }
}(function($, window, document, undefined) {

  // Polyfill new JS features for older browser
  Number.isFinite = Number.isFinite || function(value) {
    return typeof value === 'number' && isFinite(value);
  }

  var timer;

  var Timer = function(targetElement){
    this._options = {};
    this.targetElement = targetElement;
    return this;
  };

  Timer.start = function(userOptions, targetElement){
    timer = new Timer(targetElement);
    mergeOptions(timer, userOptions);
    return timer.start(userOptions);
  };

  // Writes to `this._options` object so that other
  // functions can access it without having to
  // pass this object as argument multiple times.
  function mergeOptions(timer, opts) {
    opts = opts || {};

    // Element that will be created for hours, minutes, and seconds.
    timer._options.elementContainer = opts.elementContainer || 'div';

    var classNames = opts.classNames || {};

    timer._options.classNameSeconds       = classNames.seconds  || 'jst-seconds'
      , timer._options.classNameMinutes   = classNames.minutes  || 'jst-minutes'
      , timer._options.classNameHours     = classNames.hours    || 'jst-hours'
      , timer._options.classNameClearDiv  = classNames.clearDiv || 'jst-clearDiv'
      , timer._options.classNameTimeout   = classNames.timeout || 'jst-timeout';
  }

  Timer.prototype.start = function(options) {

    var that = this;

    var createSubElements = function(timerBoxElement){
      var seconds = document.createElement(that._options.elementContainer);
      seconds.className = that._options.classNameSeconds;

      var minutes = document.createElement(that._options.elementContainer);
      minutes.className = that._options.classNameMinutes;

      var hours = document.createElement(that._options.elementContainer);
      hours.className = that._options.classNameHours;

      var clearElement = document.createElement(that._options.elementContainer);
      clearElement.className = that._options.classNameClearDiv;

      return timerBoxElement.
        append(hours).
        append(minutes).
        append(seconds).
        append(clearElement);
    };

    this.targetElement.each(function(_index, timerBox) {
      var that = this;
      var timerBoxElement = $(timerBox);
      var cssClassSnapshot = timerBoxElement.attr('class');

      timerBoxElement.on('complete', function() {
        clearInterval(timerBoxElement.intervalId);
      });

      timerBoxElement.on('complete', function() {
        timerBoxElement.onComplete(timerBoxElement);
      });

      timerBoxElement.on('complete', function(){
        timerBoxElement.addClass(that._options.classNameTimeout);
      });

      timerBoxElement.on('complete', function(){
        if(options && options.loop === true) {
          timer.resetTimer(timerBoxElement, options, cssClassSnapshot);
        }
      });

      timerBoxElement.on('pause', function() {
        clearInterval(timerBoxElement.intervalId);
        timerBoxElement.paused = true;
      });

      timerBoxElement.on('resume', function() {
        timerBoxElement.paused = false;
        that.startCountdown(timerBoxElement, { secondsLeft: timerBoxElement.data('timeLeft') });
      });

      createSubElements(timerBoxElement);
      return this.startCountdown(timerBoxElement, options);
    }.bind(this));
  };

  /**
   * Resets timer and add css class 'loop' to indicate the timer is in a loop.
   * $timerBox {jQuery object} - The timer element
   * options {object} - The options for the timer
   * css - The original css of the element
   */
  Timer.prototype.resetTimer = function($timerBox, options, css) {
    var interval = 0;
    if(options.loopInterval) {
      interval = parseInt(options.loopInterval, 10) * 1000;
    }
    setTimeout(function() {
      $timerBox.trigger('reset');
      $timerBox.attr('class', css + ' loop');
      timer.startCountdown($timerBox, options);
    }, interval);
  }

  Timer.prototype.fetchSecondsLeft = function(element){
    var secondsLeft = element.data('seconds-left');
    var minutesLeft = element.data('minutes-left');

    if(Number.isFinite(secondsLeft)){
      return parseInt(secondsLeft, 10);
    } else if(Number.isFinite(minutesLeft)) {
      return parseFloat(minutesLeft) * 60;
    }else {
      throw 'Missing time data';
    }
  };

  Timer.prototype.startCountdown = function(element, options) {
    options = options || {};

    var intervalId = null;
    var defaultComplete = function(){
      clearInterval(intervalId);
      return this.clearTimer(element);
    }.bind(this);

    element.onComplete = options.onComplete || defaultComplete;
    element.allowPause = options.allowPause || false;
    if(element.allowPause){
      element.on('click', function() {
        if(element.paused){
          element.trigger('resume');
        }else{
          element.trigger('pause');
        }
      });
    }

    var secondsLeft = options.secondsLeft || this.fetchSecondsLeft(element);

    var refreshRate = options.refreshRate || 1000;
    var endTime = secondsLeft + this.currentTime();
    var timeLeft = endTime - this.currentTime();

    this.setFinalValue(this.formatTimeLeft(timeLeft), element);

    intervalId = setInterval((function() {
      timeLeft = endTime - this.currentTime();
      // When timer has been idle and only resumed past timeout,
      // then we immediatelly complete the timer.
      if(timeLeft < 0 ){
        timeLeft = 0;
      }
      element.data('timeLeft', timeLeft);
      this.setFinalValue(this.formatTimeLeft(timeLeft), element);
    }.bind(this)), refreshRate);

    element.intervalId = intervalId;
  };

  Timer.prototype.clearTimer = function(element){
    element.find('.jst-seconds').text('00');
    element.find('.jst-minutes').text('00:');
    element.find('.jst-hours').text('00:');
  };

  Timer.prototype.currentTime = function() {
    return Math.round((new Date()).getTime() / 1000);
  };

  Timer.prototype.formatTimeLeft = function(timeLeft) {

    var lpad = function(n, width) {
      width = width || 2;
      n = n + '';

      var padded = null;

      if (n.length >= width) {
        padded = n;
      } else {
        padded = Array(width - n.length + 1).join(0) + n;
      }

      return padded;
    };

    var hours = Math.floor(timeLeft / 3600);
    timeLeft -= hours * 3600;

    var minutes = Math.floor(timeLeft / 60);
    timeLeft -= minutes * 60;

    var seconds = parseInt(timeLeft % 60, 10);

    if (+hours === 0 && +minutes === 0 && +seconds === 0) {
      return [];
    } else {
      return [lpad(hours), lpad(minutes), lpad(seconds)];
    }
  };

  Timer.prototype.setFinalValue = function(finalValues, element) {

    if(finalValues.length === 0){
      this.clearTimer(element);
      element.trigger('complete');
      return false;
    }

    element.find('.' + this._options.classNameSeconds).text(finalValues.pop());
    element.find('.' + this._options.classNameMinutes).text(finalValues.pop() + ':');
    element.find('.' + this._options.classNameHours).text(finalValues.pop() + ':');
  };


  $.fn.startTimer = function(options) {
    this.TimerObject = Timer;
    Timer.start(options, this);
    return this;
  };

}));
