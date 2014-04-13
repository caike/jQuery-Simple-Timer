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

