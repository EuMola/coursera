(function () {
  'use strict';

  angular.module('LunchCheck', [])

  .controller('LunchCheckController', LunchCheckController) ;
  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController ($scope) {

    $scope.checkMuch = function () {
      var number = getItemNumber($scope.items);
      $scope.message = evaluateMessage(number);
      $scope.color = evaluateColor(number);
    }

  }

  // Messages
  const NO_DATA = "Please enter data first";
  const ENJOY = "Enjoy!";
  const TOO_MUCH = "Too much!";
  const RED = "red";
  const GREEN = "green";

  function evaluateMessage(number) {
    if (number == 0) {
      return NO_DATA;
    } else if (number<=3) {
      return ENJOY;
    } else {
      return TOO_MUCH;
    }
  }

  function evaluateColor(number) {
    if (number == 0) {
      return RED;
    } else {
      return GREEN;
    }
  }

  function getItemNumber(items) {
    if (isEmpty(items)) {
      return 0;
    } else {
      var list = clean(items.split(","));
      return list.length;
    }
  }

  function isEmpty(str) {
    return (!str || 0 === str.length || str.match(/^ *$/) !== null);
  }

  function clean (list) {
  for (var i = 0; i < list.length; i++) {
    if (isEmpty(list[i])) {
      list.splice(i, 1);
      i--;
    }
  }
  return list;
};

})();
