(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Cateories list view
  .state('categoryList', {
    url: '/category-list',
    templateUrl: 'src/data/templates/category-list.template.html',
    controller: 'CategoriesController as catCtrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        console.log("1");
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Item list nested view
  .state('categoryList.itemList', {
    url: '/item-list/{shortName}',
    templateUrl: 'src/data/templates/item-list.template.html',
    controller: 'ItemsController as itemCtrl',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.shortName);
            }]
    }
  });

}

})();
