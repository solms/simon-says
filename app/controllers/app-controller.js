var appCtrl = angular.module('simonApp', []),
    buttons = ['TL', 'TR', 'BL', 'BR'],
    real_sequence = [],
    user_sequence = [],
    active = '',
    turn = 'AI';

appCtrl.controller('SimonBtnController', ['$scope', '$interval', function($scope, $interval){
  $scope.strict = false;
  $scope.player = {
    score: 1
  };
  // Let the games begin!
  this.start = function(){
    real_sequence = [];
    user_sequence = [];
    $scope.player.score = 1;
    $('#start').text('Restart');
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
      new Audio('public/sounds/simonSound' + buttons.indexOf(btn) + '.mp3').play();
      $interval(function(){
        active = '';
      }, 100, 1);
      user_sequence.push(btn);

      // User makes a mistake
      if(btn != real_sequence[user_sequence.length-1]){
        dropdown('Unlucky...', '#F00');
        // If not in strict mode, display the sequence again
        if(!$scope.strict){
          user_sequence = [];
          flashSequence();
        }
        // If in strict mode, restart the game
        else {
          real_sequence = [];
          user_sequence = [];
          turn = 'AI';
          $('#start').text('Start');
        }
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
        dropdown('Nice work!', '#0F0');
        turn = 'AI';
        user_sequence = [];
        real_sequence.push(buttons[Math.floor(Math.random()*4)]);
        $scope.player.score++;
        if($scope.score == 20){
          alert('YOU WIN! Congratulations.');
          real_sequence = [];
          user_sequence = [];
          turn = 'AI';
          $('#start').text('Start');
        } else {
          flashSequence();
        }
      }
    }
  }

  // Display the sequence of button flashes to the user
  var flashSequence = function(){
    var i = 0;
    $interval(function(){
      if(active == ''){
        new Audio('public/sounds/simonSound' + buttons.indexOf(real_sequence[i])
                  + '.mp3').play();
        active = real_sequence[i];
        i++;
      } else {
        active = '';
      }
    }, 500, real_sequence.length*2);
    turn = 'PLAYER';
  }

  // Display a notification that drops down from the top of the screen
  var dropdown = function(msg, bckgrnd){
    $("#notification").css({'background-color' : bckgrnd});
    $("#notification").fadeIn("slow").text(msg);
    $interval(function(){
      $("#notification").fadeOut("slow");
    }, 2000, 1)
  }

}]);
