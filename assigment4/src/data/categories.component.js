(function () {
'use strict';

angular.module('data')
.component('categoryList', {
  templateUrl: 'src/data/templates/categoryList.template.html',
  bindings: {
    categories: '<'
  }
});

})();
