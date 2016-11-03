(function () {

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'CustomerService'];
function SignUpController(MenuService, CustomerService) {
  var sign = this;

  sign.validDish = true;
  sign.validUser = false;

  sign.validate = function () {
    var promise =  MenuService.getItem(sign.user.dish.toUpperCase());

    promise.then(function (response) {
      sign.user.item = response;

      CustomerService.setUser(sign.user);
      sign.validDish = true;
      sign.validUser = true;

    })
    .catch(function (error) {
      sign.validDish = false;
      sign.validUser = false;
    });

  };

}

})();
