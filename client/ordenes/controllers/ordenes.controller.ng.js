'use strict'

angular.module('graficaExpresionApp')
.controller('OrdenesCtrl', function($scope) {
      $scope.ordenes = $scope.$meteorCollection(Ordenes).subscribe("ordenes");


          $scope.alerta3 = function(ordene){
                $scope.ordene = ordene;
                $scope.mostrar = true;
          }

});