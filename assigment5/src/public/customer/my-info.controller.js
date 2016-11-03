(function () {

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['user', 'ApiPath'];
function MyInfoController(user, ApiPath) {
  var info = this;

  info.user = user;
  info.basePath = ApiPath;
}

})();
