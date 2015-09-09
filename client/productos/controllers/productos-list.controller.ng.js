'use strict'

angular.module('graficaExpresionApp')
.controller('ProductosListCtrl', function($scope, $meteor) {

  
  $scope.productos = $scope.$meteorCollection(Productos).subscribe("productos");




});
        