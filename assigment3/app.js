(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('Endpoint',"http://davids-restaurant.herokuapp.com/menu_items.json")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'menuList.html',
    restrict: "E",
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.searchTerm = "";
  menu.search = function () {

    var promise =  MenuSearchService.getMatchedMenuItems(menu.searchTerm);

    promise.then(function (response) {
      menu.found = response;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  menu.removeItem = function (itemIndex) {
    menu.found.splice(itemIndex, 1);
  };

}

MenuSearchService.$inject = ['$http', 'Endpoint']
function MenuSearchService($http, Endpoint) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    return $http({
      method: "GET",
      url: Endpoint
    })
    .then(function (result) {
    var items = result.data.menu_items;
    return service.checkItems(items,searchTerm);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  service.checkItems = function (items, searchTerm) {
    var matched = [];
    for (var i = 0; i < items.length; i++) {

      var item = {
        name : items[i].name,
        short_name : items[i].short_name,
        description : items[i].description
      };

      if (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        matched.push(item);
      }
    }

    return matched;
  };

}


function FoundItemsDirectiveController() {
  var list = this;

  list.emptyList = function () {
    return list.items.length == 0;
  };
}

})();
