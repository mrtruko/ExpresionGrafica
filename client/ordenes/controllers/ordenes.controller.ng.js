'use strict'

angular.module('graficaExpresionApp')
.controller('OrdenesCtrl', function($scope, $rootScope) {
      $scope.ordenes = $scope.$meteorCollection(Ordenes).subscribe("ordenes");
console.log("ordenes");
          $scope.$watch("ordenes", function(newValue, oldValue) {
                console.log("cambio colaboradores");
                console.log($scope.ordenes);
                angular.forEach($scope.ordenes, function(valuePro, keyPro) {
                     console.log(valuePro);
                });
          });
});