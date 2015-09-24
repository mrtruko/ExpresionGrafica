'use strict'

angular.module('graficaExpresionApp')
.controller('OrdenesCtrl', function($scope) {
      $scope.ordenes = $scope.$meteorCollection(Ordenes).subscribe("ordenes");
});