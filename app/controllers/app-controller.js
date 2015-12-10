var appCtrl = angular.module('simonApp', []),
    buttons = ['TL', 'TR', 'BL', 'BR'],
    real_sequence = [],
    user_sequence = [],
    active = '',
    turn = 'AI';

appCtrl.controller('SimonBtnController', function($timeout){
  // Let the games begin!
  this.start = function(){
    real_sequence.push(buttons[Math.floor(Math.random()*4)]);
    flashSequence();
  }

  var flashSequence = function(){
    real_sequence.forEach(function(step){
        active = step;
        $timeout(function () {
          active = '';
        }, 1000);
    });
  }

  this.isActive = function(div){
    return active == div;
  }

  // Track the buttons the user pressed
  this.clicked = function(who){
    if(turn == 'PLAYER'){
        active = who;
    }
  }
});
