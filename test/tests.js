test('Parses initial time from seconds', function(){
  var timerElement = $('#timer1');
  var secondsLeft = 300;

  timerElement.data('seconds-left', secondsLeft);
  timerElement.startTimer();

  var expected = '00:05:00';
  ok(timerElement.text() == expected, 'Parsed ' + secondsLeft + ' to ' + expected);

  timerElement = $('#timer2');
  secondsLeft = 6300;

  timerElement.data('seconds-left', secondsLeft);
  timerElement.startTimer();

  var expected = '01:45:00';
  ok(timerElement.text() == expected, 'Parsed ' + secondsLeft + ' to ' + expected);
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

  var timerElement = $('#timer3');
  timerElement.startTimer();

  timerElement.on('complete', function(){
    equal(timerElement.text(), '00:00:00', 'Cleared timer');
    start();
  });
});

