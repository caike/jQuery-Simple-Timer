$(function(){
  $('.timer').startTimer({
    onComplete: function(element){
      $('html, body').addClass('bodyTimeoutBackground');
    },
    allowPause: true // click events will pause/resume timer
  })
})
