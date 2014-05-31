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
    setTimeout(function() {
      equal(timerElement.text(), '00:00:00', 'Cleared timer');
      start();
    }, 1000);
  });
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
