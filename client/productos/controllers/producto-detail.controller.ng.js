'use strict'

angular.module('graficaExpresionApp')
.controller('ProductoDetailCtrl', function($scope, $stateParams, $meteor) {
  $scope.producto = $scope.$meteorObject(Productos, $stateParams.productoId);
  $scope.$meteorSubscribe('productos');
  
  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.producto.save().then(
        function(numberOfDocs) {
          console.log('save successful, docs affected ', numberOfDocs);
        },
        function(error) {
          console.log('save error ', error);
        }
      )
    }
  };
        
  $scope.reset = function() {
    $scope.producto.reset();
  };
});