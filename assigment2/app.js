(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


// ** Controller As syntax
ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var ToBuy = this;

  var list = generateItemList();
  ShoppingListCheckOffService.initializeToBuyList(list);
  ToBuy.items = ShoppingListCheckOffService.getToBuyItems();

  ToBuy.buyItem = function (index) {
    ToBuy.items = ShoppingListCheckOffService.getToBuyItems();
    var item = ToBuy.items[index];
    ShoppingListCheckOffService.addBoughtItem(item);
    ShoppingListCheckOffService.removeToBuyItem(index);
  }
};

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var Bought = this;
  Bought.items = ShoppingListCheckOffService.getBoughtItems();
};

// ** Services
 function ShoppingListCheckOffService() {

  var service = this;
  // List of shopping items
  var toBuyItems = [];
  var boughtItems = [];

  service.addBoughtItem = function (item) {
    boughtItems.push(item);
  };
  service.removeToBuyItem = function (itemIdex) {
    toBuyItems.splice(itemIdex, 1);
  };
  service.getToBuyItems = function () {
    return toBuyItems;
  };
  service.getBoughtItems = function () {
    return boughtItems;
  };
  service.initializeToBuyList = function (toBuyItemsList) {
    toBuyItems = toBuyItemsList;
  };
};


var nameList = ["Cookies", "Cakes", "Pies", "Ice-creams", "Candies"];
var quantityList = [1, 2, 3, 5, 8];

function generateItemList () {
  var items = [];
  var n = Math.floor(Math.random() * 6) + 5;
  var i;
  for (i = 0; i < n; i++) {
    var item = {name: nameList[Math.floor(Math.random() * 5)],
                quantity: quantityList[Math.floor(Math.random() * 5)] };
    items.push(item);
  }
  return items;
};

})();
