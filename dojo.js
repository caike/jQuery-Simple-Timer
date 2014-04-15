$(function(){
  $('.timer').startTimer({

    onComplete: function(element){
      clearInterval(element.intervalId);
      // this allows for things like element.addClass('...');

      $('html, body').addClass('bodyTimeoutBackground');

      var restartButton = document.createElement('input')

      restartButton.type = 'button';
      restartButton.value = 'Restart';
      restartButton.onclick = function(){
        return location.reload();
      }
      $('.actions').append(restartButton);
    }
  });
})
