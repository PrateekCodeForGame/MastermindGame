angular.module('Mastermind.controllers', []).
controller('gameController', function($scope, gameService, $window, $uibModal) {
    function init() {
        gameService.newGame().then(function(response) {
            $scope.gameValues = response
            $scope.gameValues[0].state = true;
            $scope.pickedColor = "gray";
            $scope.count = 0;

            $scope.sequence = new Array();
            var colours = ["red", "blue", "yellow", "black", "green", "purple"];
            for (var i = 0; i < 4; i++) {
                var colour = colours[Math.floor(Math.random() * colours.length)];
                $scope.sequence.push(colour);
            }
        });
    };
    init();

    $scope.startNewGame = function() {
        init();
    };

    $scope.instructions = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'instructions.html',
            controller: 'instructionsCtrl',
        });
    }

    $scope.placeColor = function(index, choice) {
        if ($scope.gameValues[index].state == true) {
            $scope.gameValues[index][choice] = $scope.pickedColor;
            $scope.count = $scope.count + 1;
            console.log($scope.count);
        };
    };

    $scope.pickColor = function(color) {
        $scope.pickedColor = color;
    };

    $scope.findResult = function(index) {
        if($scope.count < 4) {
            $window.alert("Fill in the row completly");
            return;
        }
        $scope.count = 0;
        $scope.seq = [];
        angular.copy($scope.sequence, $scope.seq);
        $scope.result = [];
        $scope.findCorrectPos($scope.gameValues[index].choice1, 0);
        $scope.findCorrectPos($scope.gameValues[index].choice2, 1);
        $scope.findCorrectPos($scope.gameValues[index].choice3, 2);
        $scope.findCorrectPos($scope.gameValues[index].choice4, 3);
        if ($scope.seq[0] != "done") {
            $scope.findOccurence($scope.gameValues[index].choice1, 0);
        }
        if ($scope.seq[1] != "done") {
            $scope.findOccurence($scope.gameValues[index].choice2, 1);
        }
        if ($scope.seq[2] != "done") {
            $scope.findOccurence($scope.gameValues[index].choice3, 2);
        }
        if ($scope.seq[3] != "done") {
            $scope.findOccurence($scope.gameValues[index].choice4, 3);
        }
        $scope.result.sort().reverse();
        $scope.gameValues[index].result1 = $scope.result[0];
        $scope.gameValues[index].result2 = $scope.result[1];
        $scope.gameValues[index].result3 = $scope.result[2];
        $scope.gameValues[index].result4 = $scope.result[3];
        var win = true;
        for (var i = 0; i < 4; i++) {
            if ($scope.result[i] != "green") {
                win = false;
                break;
            }
        }
        if (win == true) {
            $window.alert("You Win");
            init();
        } else {
            if (index == $scope.gameValues.length - 1) {
                $window.alert("You Loose");
                init();
            } else {
                $scope.gameValues[index].state = false;
                $scope.gameValues[index + 1].state = true;
            }
        }
    };

    $scope.findOccurence = function(value, index) {
        var pos = _.indexOf($scope.seq, value, 0)
        if (pos == -1) {
            $scope.result.push("gray");
        } else {
            $scope.result.push("red");
            $scope.seq[pos] = "checked";
        };
    };

    $scope.findCorrectPos = function(value, index) {
        if ($scope.seq[index] == value) {
            $scope.result.push("green");
            $scope.seq[index] = "done";
        };
    }
})

.controller('instructionsCtrl', function($scope, $uibModalInstance) {
    $scope.ok = function() {
        $uibModalInstance.dismiss();
    };
});
