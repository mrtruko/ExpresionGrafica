'use strict'

angular.module('graficaExpresionApp')
.directive('sidebar', function() {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/sidebar/sidebar.view.ng.html',
    replace: true
  };
});