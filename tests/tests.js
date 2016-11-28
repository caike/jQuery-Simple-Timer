test('Parses initial time from seconds', function(){
  var timerElement = $('#timer1');
  var secondsLeft = 300;

  timerElement.data('seconds-left', secondsLeft);
  timerElement.startTimer();

  var actual = timerElement.text();
  var expected = '00:05:00';

  equal(actual, expected, 'Parsed ' + secondsLeft + ' to ' + expected);

  timerElement = $('#timer2');
  secondsLeft = 6300;

  timerElement.data('seconds-left', secondsLeft);
  timerElement.startTimer();

  actual = timerElement.text();
  expected = '01:45:00';
  equal(actual, expected, 'Parsed ' + secondsLeft + ' to ' + expected);
});

test('Returns self', function() {
  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 2);
  var returnElement = timerElement.startTimer();
  equal(timerElement, returnElement, 'Returns self');
});


asyncTest('Calls the complete event when timer is up', function () {
  expect(1);

  var timerElement = $('#timer3');

  timerElement.on('complete', function(){
    ok(true, 'Called the complete event');
    start();
  });

  timerElement.startTimer();
});


test('Adds timeout class when timer is up', function () {
  var timerElement = $('#timer3');
  timerElement.startTimer();
  timerElement.trigger('complete');
  ok(timerElement.hasClass('jst-timeout'), 'adds default timeout class');
});

asyncTest('Clears the timer when complete and no options', function () {
  expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 9999);
  timerElement.startTimer();

  timerElement.on('complete', function(){
    equal(timerElement.text(), '00:00:00', 'Cleared timer');
    start();
  });

  timerElement.trigger('complete');
});

asyncTest('Clears the timer when complete and with options', function () {
  expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 1);
  timerElement.startTimer({
    onComplete: function() {
      console.log('complete');
    }
  });

  timerElement.on('complete', function(){
    equal(timerElement.text(), '00:00:00', 'Cleared timer');
    start();
  });
});


asyncTest('Cleas the timer when 0 minutes left', function () {
  expect(1);

  var timerElement = $('#timer1');
  timerElement.data('minutes-left', 0);

  var plugin = timerElement.startTimer({});

  setTimeout(function() {
    equal(timerElement.text(), '00:00:00', 'Cleared timer');
    start();
  }, 1000);
});

asyncTest('Clears the timer when 0 seconds left', function () {
  expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 0);

  var plugin = timerElement.startTimer({});

  setTimeout(function() {
    equal(timerElement.text(), '00:00:00', 'Cleared timer');
    start();
  }, 1000);
});

asyncTest('Do not restart timer when loop option is false', function() {
  expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 0.5);
  timerElement.startTimer({
    loop:false
  });
  setTimeout(function() {
    equal(timerElement.hasClass('loop'), false, 'Timer not in Loop');
    start();
  }, 1000);
});

asyncTest('Restart timer when loop option is true', function() {
  expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 0.5);
  timerElement.startTimer({
    loop:true
  });
  setTimeout(function() {
    equal(timerElement.hasClass('loop'), true, 'Timer in Loop');
    start();
  }, 1000);
});

test('Parses initial time from minutes', function(){
  var timerElement = $('#timer1');
  var minutesLeft = 2;

  timerElement.data('minutes-left', minutesLeft);
  timerElement.startTimer();

  var actual = timerElement.text();
  var expected = '00:02:00';

  equal(actual, expected, 'Parsed ' + minutesLeft + ' to ' + expected);

  timerElement = $('#timer2');
  minutesLeft = 1.5;

  timerElement.data('minutes-left', minutesLeft);
  timerElement.startTimer();

  actual = timerElement.text();
  expected = '00:01:30';
  equal(actual, expected, 'Parsed ' + minutesLeft + ' to ' + expected);
});

test('Throws error when no data present', function() {

  var timerElement = $('#timer1');

  throws(
    function() { timerElement.startTimer(); }, 'Errors when missing data'
  );
});

asyncTest('Pauses on click when allowPause is true', function () {
  expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 3);
  timerElement.startTimer({
    onComplete: function() {
      console.log('complete');
    },
    allowPause: true
  }).trigger('click')

  setTimeout(function() {
    equal(timerElement.text(), '00:00:03', 'Timer is on pause');
    start();
  }, 3000);
});

asyncTest('Does NOT pause on click when allowPause is not specified', function () {
  expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 2);
  timerElement.startTimer({
    onComplete: function() {
      console.log('complete');
    },
    // allowPause: true
  }).trigger('click')


  setTimeout(function() {
    equal(timerElement.text(), '00:00:01', 'Cleared timer');
    start();
  }, 1500);
});

asyncTest('Does NOT pause on click when allowPause is false', function () {
  expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 2);
  timerElement.startTimer({
    onComplete: function() {
      console.log('complete');
    },
    allowPause: false
  }).trigger('click')


  setTimeout(function() {
    equal(timerElement.text(), '00:00:01', 'Cleared timer');
    start();
  }, 1000);
});

asyncTest('When timeLeft is less than 0, it completes upon return (computer asleep or browser tab is inactive)', function () {
  expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 3);

  var plugin = timerElement.startTimer({
    onComplete: function() {
      console.log('complete');
    }
  })

  // Force time in the future
  plugin.TimerObject.prototype.currentTime = function(){
    return Math.round((new Date()).getTime() / 1000) + 1000;
  }

  setTimeout(function() {
    equal(timerElement.text(), '00:00:00', 'Cleared timer');
    start();
  }, 1000);
});

asyncTest('When seconds left is greater than 24h, timer displays proper hour', function () {
  expect(1);

  var timerElement = $('#timer1');
  var twentySixHoursInSeconds = (26*60*60)
  timerElement.data('seconds-left', twentySixHoursInSeconds);

  var plugin = timerElement.startTimer({
    onComplete: function() {
      console.log('complete');
    }
  })

  setTimeout(function() {
    equal(timerElement.text(), '26:00:00', 'Cleared timer');
    start();
  }, 500);
});

asyncTest('When minutes left is greater than 24h, timer displays proper hour', function () {
  expect(1);

  var timerElement = $('#timer1');
  var twentyEightHoursInMinutes = (28*60)
  timerElement.data('minutes-left', twentyEightHoursInMinutes);

  var plugin = timerElement.startTimer({
    onComplete: function() {
      console.log('complete');
    }
  })

  setTimeout(function() {
    equal(timerElement.text(), '28:00:00', 'Cleared timer');
    start();
  }, 500);
});

test('Uses default classNames when none given via options', function(){
  var timerElement = $('#timer1');
  var secondsLeft = 2;

  timerElement.data('seconds-left', secondsLeft);
  timerElement.startTimer();

  equal(timerElement.find('.jst-hours').length, 1, 'Default hours class');
  equal(timerElement.find('.jst-minutes').length, 1, 'Default minutes class');
  equal(timerElement.find('.jst-seconds').length, 1, 'Default seconds class');
  equal(timerElement.find('.jst-clearDiv').length, 1, 'Default clearDiv class');
});

test('Accepts options for element classNames', function(){
  var timerElement = $('#timer1');
  var secondsLeft = 10;

  timerElement.data('seconds-left', secondsLeft);
  timerElement.startTimer({
    classNames: {
      hours: 'banana-hours',
      minutes: 'banana-minutes',
      seconds: 'banana-seconds',
      clearDiv: 'banana-clearDiv',
      timeout: 'banana-timeout'
    }
  });

  equal(timerElement.find('.banana-hours').length, 1, 'Found hours class');
  equal(timerElement.find('.banana-minutes').length, 1, 'Found minutes class');
  equal(timerElement.find('.banana-seconds').length, 1, 'Found seconds class');
  equal(timerElement.find('.banana-clearDiv').length, 1, 'Found clearDiv class');
  timerElement.trigger('complete');
  ok(timerElement.hasClass('banana-timeout'), 'Found timeout class');
});

asyncTest('Runs independent timers with custom options', function(){
  expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 10);
  timerElement.startTimer();
  setTimeout(function() {
    equal(timerElement.text(), '00:00:08', 'Cleared timer');
    start();
  }, 2500);

  var timerElement2 = $('#timer2');
  timerElement2.data('seconds-left', 5);

  timerElement2.startTimer({
    classNames: {
      hours: 'banana-hours',
      minutes: 'banana-minutes',
      seconds: 'banana-seconds',
      clearDiv: 'banana-clearDiv',
      timeout: 'banana-timeout'
    }
  });

});

