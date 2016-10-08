(function () {
'use strict';

angular.module('data')
.component('itemList', {
  templateUrl: 'src/data/templates/itemList.template.html',
  bindings: {
    items: '<',
    category: '<'
  }
});

})();
