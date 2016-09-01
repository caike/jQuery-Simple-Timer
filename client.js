"use strict";

let $ = require("jquery");
require("jquery-simple-timer")($);


$(function(){

    $('.timer-quick').startTimer();

    $('.timer').startTimer({
      onComplete: function(){
        console.log('Complete');
      }
    });

    $('.timer-pause').startTimer({
      onComplete: function(){
        console.log('Complete');
      },
      allowPause: true
    });
})
