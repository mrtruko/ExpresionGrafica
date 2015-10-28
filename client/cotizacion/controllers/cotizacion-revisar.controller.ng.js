'use strict'

angular.module('graficaExpresionApp')
    .controller('CotizacionRevisarCtrl', function($scope) {
        $scope.cotizaciones = $scope.$meteorCollection(Cotizacion).subscribe("cotizacion");
    });