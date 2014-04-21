$(function(){
  $('.timer').startTimer({
    onComplete: function(element){
      $('html, body').addClass('bodyTimeoutBackground');
    }
  }).click(function(){ location.reload() });
})
