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

  var actual = timerElement.text();
  var expected = '01:45:00';
  equal(actual, expected, 'Parsed ' + secondsLeft + ' to ' + expected);
});

test('Parses seconds to days', function(){
  var timerElement = $('#timer1');
  var secondsLeft = 172800;;

  timerElement.data('seconds-left', secondsLeft);
  timerElement.startTimer();

  var actual = timerElement.text();
  var expected = '2 days 00:00:00';
  equal(actual, expected, 'Parsed ' + secondsLeft + ' to ' + expected);
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

asyncTest('Defaults to clearing the timer when complete', function () {
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

