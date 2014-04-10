$.fn.startTheTimer = function(options) {

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
    var days, daysLeft, hours, minutes, remaining, seconds;
    daysLeft = Math.floor(timeLeft / 60 / 60 / 24);
    if (daysLeft > 0) {
      days = lpad(daysLeft);
    } else {
      days = lpad(0);
    }
    remaining = new Date(timeLeft * 1000);
    hours = remaining.getUTCHours();
    minutes = remaining.getUTCMinutes();
    seconds = remaining.getUTCSeconds();

    if (+hours === 0 && +minutes === 0 && +seconds === 0) {
      setTimeout((function() {
        // reloads current url when timer is up
        location.reload();
      }), 200);
    } else {
      return [lpad(days), lpad(hours), lpad(minutes), lpad(seconds)];
    }
  };

  var setFinalValue = function(finalValues, element) {
    element.find('.seconds').text(finalValues.pop());
    element.find('.minutes').text(finalValues.pop() + ':');
    element.find('.hours').text(finalValues.pop() + ':');
    element.find('.days').text(finalValues.pop());
  };

  var startCountdown = function(element, options) {
    var secondsLeft = parseInt(element.data('seconds-left'), 10);
    var refreshRate = options['refreshRate'] || 1000;
    var endTime = secondsLeft + currentTime();
    var timeLeft = endTime - currentTime();

    setFinalValue(formatTimeLeft(timeLeft), element);

    setInterval((function() {
      timeLeft = endTime - currentTime();
      setFinalValue(formatTimeLeft(timeLeft), element);
    }), refreshRate);
  };

  var createSubDivs = function(timerBoxElement){
    var seconds = document.createElement('div')
    seconds.className = 'seconds';

    var minutes = document.createElement('div')
    minutes.className = 'minutes';

    var hours = document.createElement('div')
    hours.className = 'hours';

    var clearDiv = document.createElement('div')
    clearDiv.className = 'clearDiv';
    
    return timerBoxElement.
      append(hours).
      append(minutes).
      append(seconds).
      append(clearDiv);
  }

  this.each(function(_index, timerBox) {
    var timerBoxElement = $(timerBox);
    createSubDivs(timerBoxElement);
    return startCountdown(timerBoxElement, options);
  });
};

