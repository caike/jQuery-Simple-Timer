$(function(){
  $('.timer').startTimer({

    onComplete: function(element){
      clearInterval(element.intervalId);
      // this allows for things like element.addClass('...');

      $('html, body').addClass('bodyTimeoutBackground');
    }
  }).click(function(){ location.reload() });
})
