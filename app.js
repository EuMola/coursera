(function () {
'use strict';

angular.module('myFirstApp', [])

.controller('MyFirstController', function ($scope) {
  $scope.name = "Jack";
  $scope.sayHello = function () {
    return "Hello Coursera!";
  };

});

})();
