var appCtrl = angular.module('simonApp', []),
    buttons = ['TL', 'TR', 'BL', 'BR'],
    real_sequence = [],
    user_sequence = [],
    active = '';

appCtrl.controller('SimonBtnController', function(){
  // Let the games begin!
  this.start = function(){
    real_sequence.push(buttons[Math.floor(Math.random()*4)]);
    flashSequence();
  }

  this.isActive = function(div){
    return active == div;
  }

  // Track the buttons the user pressed
  this.clicked = function(who){
    active = who;
  }
});

// Show the user the real sequence
function flashSequence(){
  real_sequence.forEach(function(step){
    alert(step);
  });
}
