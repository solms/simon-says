var appCtrl = angular.module('simonApp', []),
    buttons = ['TL', 'TR', 'BL', 'BR'],
    real_sequence = [],
    user_sequence = [],
    active = '',
    turn = 'AI';

appCtrl.controller('SimonBtnController', function($interval){
  // Let the games begin!
  this.start = function(){
    real_sequence.push(buttons[Math.floor(Math.random()*4)]);
    flashSequence();
  }

  var flashSequence = function(){
    var i = 0;
    $interval(function(){
      if(active == ''){
        active = real_sequence[i];
        i++;
      } else {
        active = '';
      }
    }, 500, real_sequence.length*2);
    /*for(var i=0; i<real_sequence.length; i++){
      console.log('i:'+i);
      active = real_sequence[i];
      $timeout(function(){
        active = '';
      }, 1000);
    }*/
    /*real_sequence.forEach(function(step){
        active = step;
        $timeout(function () {
          active = '';
        }, 1000);
    });*/
    turn = 'PLAYER';
  }

  this.isActive = function(div){
    return active == div;
  }

  // Track the buttons the user pressed
  this.clicked = function(btn){

    if(turn == 'PLAYER' && user_sequence.length<real_sequence.length){
      user_sequence.push(btn);
    }
    if(turn == 'PLAYER' && user_sequence.length == real_sequence.length){
      if(user_sequence.toString() == real_sequence.toString()){
        console.log('Nice work!');
        turn = 'AI';
        user_sequence = [];
        real_sequence.push(buttons[Math.floor(Math.random()*4)]);
        flashSequence();
      } else {
        real_sequence = [];
        user_sequence = [];
        turn = 'AI';
      }
    }
  }
});
