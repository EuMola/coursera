(function () {
'use strict';

angular.module('data')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['items'];
function ItemsController(items) {
  var itemCtrl = this;

  itemCtrl.items = items.menu_items;
  if (items.category != null) {
    itemCtrl.category = items.category.name;
  }
  else {
    itemCtrl.category = "";
  }
}

})();
