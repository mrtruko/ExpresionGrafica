'use strict'

angular.module('graficaExpresionApp')
.controller('CotizacionCtrl', function($scope) {
      $scope.cotizaciones = $scope.$meteorCollection(Cotizacion).subscribe("cotizacion");
});