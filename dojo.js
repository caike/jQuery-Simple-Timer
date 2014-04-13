$(function(){
  $('.timer').startTimer({
    onComplete: function(intervalId){
      $('html, body').addClass('bodyTimeoutBackground');
      $('.timer').text('00:00:00'); // workaround for bug - TODO: open GH issue

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
