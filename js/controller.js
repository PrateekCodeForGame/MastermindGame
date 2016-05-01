angular.module('Mastermind.controllers', []).
controller('gameController', function($scope, gameService) {
  function init() {
    gameService.newGame().then(function(response) {
      $scope.gameValues = response
      $scope.gameValues[0].state = true;

      $scope.sequence = new Array();
      var colours = ["red", "blue", "yellow", "black", "green", "purple"];
      for (var i = 0; i < 4; i++) {
        var colour = colours[Math.floor(Math.random() * colours.length)];
        $scope.sequence.push(colour);
      }
    });
  };
  init();

  $scope.placeColor = function(index, choice) {
    if ($scope.gameValues[index].state == true) {
      $scope.gameValues[index][choice] = $scope.pickedColor;
    }
  };

  $scope.pickColor = function(color) {
    $scope.pickedColor = color;
  };

  $scope.findResult = function(index) {
    $scope.seq = [];
    angular.copy($scope.sequence, $scope.seq);
    $scope.result = [];
    console.log($scope.seq);
    $scope.findCorrectPos($scope.gameValues[index].choice1, 0);
    $scope.findCorrectPos($scope.gameValues[index].choice2, 1);
    $scope.findCorrectPos($scope.gameValues[index].choice3, 2);
    $scope.findCorrectPos($scope.gameValues[index].choice4, 3);
    if ($scope.seq[0] != "done") {
      $scope.findPosition($scope.gameValues[index].choice1, 0);
    }
    if ($scope.seq[1] != "done") {
      $scope.findPosition($scope.gameValues[index].choice2, 1);
    }
    if ($scope.seq[2] != "done") {
      $scope.findPosition($scope.gameValues[index].choice3, 2);
    }
    if ($scope.seq[3] != "done") {
      $scope.findPosition($scope.gameValues[index].choice4, 3);
    }
    $scope.result.sort().reverse();
    $scope.gameValues[index].result1 = $scope.result[0];
    $scope.gameValues[index].result2 = $scope.result[1];
    $scope.gameValues[index].result3 = $scope.result[2];
    $scope.gameValues[index].result4 = $scope.result[3];
    $scope.gameValues[index].state = false;
    $scope.gameValues[index + 1].state = true;
    console.log($scope.seq, $scope.sequence);
  };

  $scope.findPosition = function(value, index) {
    var pos = _.indexOf($scope.seq, value, 0)
    if (pos == -1) {
      $scope.result.push("gray");
    } else {
      $scope.result.push("red");
      $scope.seq[pos] = "checked";
    };
  };

  $scope.findCorrectPos = function(value, index) {
    var pos = _.indexOf($scope.seq, value, 0)
    if (pos == index) {
      $scope.result.push("green");
      $scope.seq[pos] = "done";
    };
    console.log(pos, value, index);
  }
});