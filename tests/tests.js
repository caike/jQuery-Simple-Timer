QUnit.config.testTimeout = 20000;
const test = QUnit.test;

test('Parses initial time from seconds', function(assert){
  var timerElement = $('#timer1');
  var secondsLeft = 300;

  timerElement.data('seconds-left', secondsLeft);
  timerElement.startTimer();

  var actual = timerElement.text();
  var expected = '00:05:00';

  assert.equal(actual, expected, 'Parsed ' + secondsLeft + ' to ' + expected);

  timerElement = $('#timer2');
  secondsLeft = 6300;

  timerElement.data('seconds-left', secondsLeft);
  timerElement.startTimer();

  actual = timerElement.text();
  expected = '01:45:00';
  assert.equal(actual, expected, 'Parsed ' + secondsLeft + ' to ' + expected);
});

test('Returns self', function(assert) {
  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 2);
  var returnElement = timerElement.startTimer();
  assert.equal(timerElement, returnElement, 'Returns self');
});


test('Calls the complete event when timer is up', function (assert) {
  const done = assert.async();
  assert.expect(1);

  var timerElement = $('#timer3');

  timerElement.on('complete', function(){
    assert.ok(true, 'Called the complete event');
    done();
  });

  timerElement.startTimer();
});


test('Adds timeout class when timer is up', function (assert) {
  var timerElement = $('#timer3');
  timerElement.startTimer();
  timerElement.trigger('complete');
  assert.ok(timerElement.hasClass('jst-timeout'), 'adds default timeout class');
});

test('Clears the timer when complete and no options', function (assert) {
  const done = assert.async();
  assert.expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 9999);
  timerElement.startTimer();

  timerElement.on('complete', function(){
    assert.equal(timerElement.text(), '00:00:00', 'Cleared timer');
    done();
  });

  timerElement.trigger('complete');
});

test('Clears the timer when complete and with options', function (assert) {
  const done = assert.async();
  assert.expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 1);
  timerElement.startTimer({
    onComplete: function() {
      console.log('complete');
    }
  });

  timerElement.on('complete', function(){
    assert.equal(timerElement.text(), '00:00:00', 'Cleared timer');
    done();
  });
});


test('Cleas the timer when 0 minutes left', function (assert) {
  const done = assert.async();
  assert.expect(1);

  var timerElement = $('#timer1');
  timerElement.data('minutes-left', 0);

  var plugin = timerElement.startTimer({});

  setTimeout(function() {
    assert.equal(timerElement.text(), '00:00:00', 'Cleared timer');
    done();
  }, 1000);
});

test('Clears the timer when 0 seconds left', function (assert) {
  const done = assert.async();
  assert.expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 0);

  var plugin = timerElement.startTimer({});

  setTimeout(function() {
    assert.equal(timerElement.text(), '00:00:00', 'Cleared timer');
    done();
  }, 1000);
});

test('Do not restart timer when loop option is false', function(assert) {
  const done = assert.async();
  assert.expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 0.5);
  timerElement.startTimer({
    loop:false
  });
  setTimeout(function() {
    assert.equal(timerElement.hasClass('loop'), false, 'Timer not in Loop');
    done();
  }, 1000);
});

test('Restart timer when loop option is true', function(assert) {
  const done = assert.async();
  assert.expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 0.5);
  timerElement.startTimer({
    loop:true
  });
  setTimeout(function() {
    assert.equal(timerElement.hasClass('loop'), true, 'Timer in Loop');
    done();
  }, 1000);
});

test('Parses initial time from minutes', function(assert){
  var timerElement = $('#timer1');
  var minutesLeft = 2;

  timerElement.data('minutes-left', minutesLeft);
  timerElement.startTimer();

  var actual = timerElement.text();
  var expected = '00:02:00';

  assert.equal(actual, expected, 'Parsed ' + minutesLeft + ' to ' + expected);

  timerElement = $('#timer2');
  minutesLeft = 1.5;

  timerElement.data('minutes-left', minutesLeft);
  timerElement.startTimer();

  actual = timerElement.text();
  expected = '00:01:30';
  assert.equal(actual, expected, 'Parsed ' + minutesLeft + ' to ' + expected);
});

//test('Throws error when no data present', function(assert) {

  //var timerElement = $('#timer1');

  //assert.throws(
    //function() { timerElement.startTimer(); }, 'Errors when missing data'
  //);
//});

test('Pauses on click when allowPause is true', function(assert) {
  const done = assert.async();
  assert.expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 3);
  timerElement.startTimer({
    onComplete: function() {
      console.log('complete');
    },
    allowPause: true
  }).trigger('click')

  setTimeout(function() {
    assert.equal(timerElement.text(), '00:00:03', 'Timer is on pause');
    done();
  }, 3000);
});

test('Calls onComplete after toggle allowPause', function(assert) {
  const done = assert.async();
  assert.expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 3);
  timerElement.startTimer({
    onComplete: function() {
      assert.ok(true, 'Called the complete event');
      done();
    },
    allowPause: true
  }).trigger('click').trigger('click');

});

test('Does NOT pause on click when allowPause is not specified', function(assert) {
  const done = assert.async();
  assert.expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 2);
  timerElement.startTimer({
    onComplete: function() {
      console.log('complete');
    },
    // allowPause: true
  }).trigger('click')


  setTimeout(function() {
    assert.equal(timerElement.text(), '00:00:01', 'Cleared timer');
    done();
  }, 1500);
});

test('Does NOT pause on click when allowPause is false', function(assert) {
  const done = assert.async();
  assert.expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 2);
  timerElement.startTimer({
    onComplete: function() {
      console.log('complete');
    },
    allowPause: false
  }).trigger('click')


  setTimeout(function() {
    assert.equal(timerElement.text(), '00:00:00', 'Cleared timer');
    done();
  }, 3000);
});

test('When timeLeft is less than 0, it completes upon return (computer asleep or browser tab is inactive)', function (assert) {
  const done = assert.async();
  assert.expect(1);

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
    assert.equal(timerElement.text(), '00:00:00', 'Cleared timer');
    done();
  }, 1000);
});

test('When seconds left is greater than 24h, timer displays proper hour', function (assert) {
  const done = assert.async();
  assert.expect(1);

  var timerElement = $('#timer1');
  var twentySixHoursInSeconds = (26*60*60)
  timerElement.data('seconds-left', twentySixHoursInSeconds);

  var plugin = timerElement.startTimer({
    onComplete: function() {
      console.log('complete');
    }
  })

  setTimeout(function() {
    assert.equal(timerElement.text(), '26:00:00', 'Cleared timer');
    done();
  }, 500);
});

test('When minutes left is greater than 24h, timer displays proper hour', function (assert) {
  const done = assert.async();
  assert.expect(1);

  var timerElement = $('#timer1');
  var twentyEightHoursInMinutes = (28*60)
  timerElement.data('minutes-left', twentyEightHoursInMinutes);

  var plugin = timerElement.startTimer({
    onComplete: function() {
      console.log('complete');
    }
  })

  setTimeout(function() {
    assert.equal(timerElement.text(), '28:00:00', 'Cleared timer');
    done();
  }, 500);
});

test('Uses default classNames when none given via options', function(assert){
  var timerElement = $('#timer1');
  var secondsLeft = 2;

  timerElement.data('seconds-left', secondsLeft);
  timerElement.startTimer();

  assert.equal(timerElement.find('.jst-hours').length, 1, 'Default hours class');
  assert.equal(timerElement.find('.jst-minutes').length, 1, 'Default minutes class');
  assert.equal(timerElement.find('.jst-seconds').length, 1, 'Default seconds class');
  assert.equal(timerElement.find('.jst-clearDiv').length, 1, 'Default clearDiv class');
});

test('Accepts options for element classNames', function(assert){
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

  assert.equal(timerElement.find('.banana-hours').length, 1, 'Found hours class');
  assert.equal(timerElement.find('.banana-minutes').length, 1, 'Found minutes class');
  assert.equal(timerElement.find('.banana-seconds').length, 1, 'Found seconds class');
  assert.equal(timerElement.find('.banana-clearDiv').length, 1, 'Found clearDiv class');
  timerElement.trigger('complete');
  assert.ok(timerElement.hasClass('banana-timeout'), 'Found timeout class');
});

test('Runs independent timers with custom options', function(assert){
  const done = assert.async();
  assert.expect(1);

  var timerElement = $('#timer1');
  timerElement.data('seconds-left', 10);
  timerElement.startTimer();
  setTimeout(function() {
    assert.equal(timerElement.text(), '00:00:08', 'Cleared timer');
    done();
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

