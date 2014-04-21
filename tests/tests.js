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

