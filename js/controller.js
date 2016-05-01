angular.module('Mastermind.controllers', []).
controller('gameController', function($scope, gameService) {
  function init() {
    gameService.newGame().then(function(response) {
      $scope.gameValues = response
    });
  };
  init();

  $scope.placeColor = function(index, choice) {
    $scope.gameValues[index][choice] = $scope.pickedColor;
  };

  $scope.pickColor = function(color) {
    $scope.pickedColor = color;
  }
});