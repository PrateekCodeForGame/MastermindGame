angular.module('Mastermind.services', []).
factory('gameService', function($q) {
  var gameSer = {};

  function user() {
    this.choice1 = "gray";
    this.choice2 = "gray";
    this.choice3 = "gray";
    this.choice4 = "gray";
    this.state = false;
    this.result1 = "gray";
    this.result2 = "gray";
    this.result3 = "gray";
    this.result4 = "gray";
  };

  gameSer.newGame = function() {
    var deferred = $q.defer();
    gameValues = new Array();
    for (var i = 0; i < 10; i++) {
      gameValues.push(new user());
    };
    deferred.resolve(gameValues);
    return deferred.promise;
  };

  return gameSer;
});