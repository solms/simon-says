var appCtrl = angular.module('simonApp', []);
appCtrl.controller('SimonBtnController', function(){
  this.clicked = function(who){
    alert(who);
  }
});
