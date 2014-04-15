$(function(){
  $('.timer').startTimer({

    onComplete: function(intervalId){
      clearInterval(intervalId);

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
