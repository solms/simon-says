var appCtrl = angular.module('simonApp', []),
    buttons = ['TL', 'TR', 'BL', 'BR'],
    real_sequence = [],
    user_sequence = [],
    active = '',
    turn = 'AI';

appCtrl.controller('SimonBtnController', ['$scope', '$interval', function($scope, $interval){
  $scope.player = {
    score: 1
  };
  // Let the games begin!
  this.start = function(){
    $('#start').prop('disabled',true);
    $('html').css({
      'background-color': '#FFF'
    });
    real_sequence.push(buttons[Math.floor(Math.random()*4)]);
    flashSequence();
  }

  this.isActive = function(div){
    return active == div;
  }

  // Track the buttons the user pressed
  this.clicked = function(btn){

    if(turn == 'PLAYER' && user_sequence.length<real_sequence.length){
      active = btn;
      $interval(function(){
        active = '';
      }, 100, 1);
      user_sequence.push(btn);
      if(btn != real_sequence[user_sequence.length-1]){
        $('html').css({
          'background-color': '#D66'
        });
        console.log('Unlucky...');
        real_sequence = [];
        user_sequence = [];
        turn = 'AI';
        $('#start').prop('disabled',false);
      } else {
        $('html').css({
          'background-color': '#6D6'
        });
        $interval(function(){
          $('html').css({
            'background-color': '#FFF'
          });
        }, 150, 1)
      }
    }
    if(turn == 'PLAYER' && user_sequence.length == real_sequence.length){
      if(user_sequence.toString() == real_sequence.toString()){
        console.log('Nice work!');
        turn = 'AI';
        user_sequence = [];
        real_sequence.push(buttons[Math.floor(Math.random()*4)]);
        $scope.player.score++;
        flashSequence();
      } /*else {
        console.log('Unlucky...');
        real_sequence = [];
        user_sequence = [];
        turn = 'AI';
      }*/
    }
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
    turn = 'PLAYER';
  }

}]);
