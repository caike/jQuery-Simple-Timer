/*
* jQuery-Simple-Timer
*
* Creates a countdown timer.
*
* Example:
*   $('.timer').startTimer();
*
*/
(function($){
  $.fn.startTimer = function(options) {

    var that = this;

    var currentTime = function() {
      return Math.round((new Date()).getTime() / 1000);
    };

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

    var formatTimeLeft = function(timeLeft) {
      var hours, minutes, remaining, seconds;
      remaining = new Date(timeLeft * 1000);
      hours = remaining.getUTCHours();
      minutes = remaining.getUTCMinutes();
      seconds = remaining.getUTCSeconds();

      if (+hours === 0 && +minutes === 0 && +seconds === 0) {
        return [];
      } else {
        return [lpad(hours), lpad(minutes), lpad(seconds)];
      }
    };

    var setFinalValue = function(finalValues, element) {

      if(finalValues.length === 0){
        clearTimer(element);
        element.trigger('complete');
        return false;
      }

      element.find('.seconds').text(finalValues.pop());
      element.find('.minutes').text(finalValues.pop() + ':');
      element.find('.hours').text(finalValues.pop() + ':');
    };

    var clearTimer = function(element){
      element.find('.seconds').text('00');
      element.find('.minutes').text('00:');
      element.find('.hours').text('00:');
    };

    var startCountdown = function(element, options) {
      options = options || {};

      var intervalId = null;
      var defaultComplete = function(){
        clearInterval(intervalId);
        return clearTimer(element);
      };

      element.onComplete = options.onComplete || defaultComplete;

      var secondsLeft = parseInt(element.data('seconds-left'), 10);
      var refreshRate = options.refreshRate || 1000;
      var endTime = secondsLeft + currentTime();
      var timeLeft = endTime - currentTime();

      setFinalValue(formatTimeLeft(timeLeft), element);

      intervalId = setInterval((function() {
        timeLeft = endTime - currentTime();
        setFinalValue(formatTimeLeft(timeLeft), element);
      }), refreshRate);

      element.intervalId = intervalId;
    };

    var createSubDivs = function(timerBoxElement){
      var seconds = document.createElement('div');
      seconds.className = 'seconds';

      var minutes = document.createElement('div');
      minutes.className = 'minutes';

      var hours = document.createElement('div');
      hours.className = 'hours';

      var clearDiv = document.createElement('div');
      clearDiv.className = 'clearDiv';

      return timerBoxElement.
        append(hours).
        append(minutes).
        append(seconds).
        append(clearDiv);
    };

    this.each(function(_index, timerBox) {
      var timerBoxElement = $(timerBox);

      timerBoxElement.on('complete', function() {
        timerBoxElement.onComplete(timerBoxElement);
      });

      timerBoxElement.on('complete', function(){
        timerBoxElement.addClass('timeout');
      });

      createSubDivs(timerBoxElement);
      return startCountdown(timerBoxElement, options);
    });

  };
})(jQuery);

