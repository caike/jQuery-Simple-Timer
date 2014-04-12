test('Parses initial time from seconds', function(){
  var timerElement = $('#timer1');

  timerElement.data('seconds-left', 300);
  timerElement.startTimer();

  var expected = '00:05:00';
  ok(timerElement.text() == expected, 'Did not parse start time as ' + expected)

  timerElement = $('#timer2');
  timerElement.data('seconds-left', 6300);
  timerElement.startTimer();

  var expected = '01:45:00';
  ok(timerElement.text() == expected, 'Did not parse start time as ' + expected)
});

