'use strict'

angular.module('graficaExpresionApp')
.controller('CotizacionCtrl', function($scope) {
      $scope.cotizaciones = $scope.$meteorCollection(Cotizacion).subscribe("cotizacion");

          $scope.empresaR = function(empresa){
                $scope.empresa = $scope.$meteorObject(Empresas, empresa,false).subscribe("empresas");
                return $scope.empresa.rut;
          }
          $scope.clienteR = function(cliente){
                $scope.cliente = $scope.$meteorObject(Clientes, cliente,false).subscribe("clientes");

                return $scope.cliente.rut;
          }
});