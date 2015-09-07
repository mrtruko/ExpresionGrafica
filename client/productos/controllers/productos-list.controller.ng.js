'use strict'

angular.module('graficaExpresionApp')
.controller('ProductosListCtrl', function($scope, $meteor) {
  $scope.page = 1
  $scope.perPage = 3
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1'
  
  $scope.productos = $scope.$meteorCollection(function() {
    return Productos.find({}, {sort:$scope.getReactively('sort')});
  });
  $meteor.autorun($scope, function() {
    $scope.$meteorSubscribe('productos', {
      limit: parseInt($scope.getReactively('perPage')),
      skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
      sort: $scope.getReactively('sort')
    }, $scope.getReactively('search')).then(function() {
      $scope.productosCount = $scope.$meteorObject(Counts, 'numberOfProductos', false);
    });
  });

  $meteor.session('productosCounter').bind($scope, 'page');
    
  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.productos.save($scope.newProducto);
      $scope.newProducto = undefined;
    }
  };
      
  $scope.remove = function(producto) {
    $scope.productos.remove(producto);
  };
    
  $scope.pageChanged = function(newPage) {
    $scope.page = newPage;
  };
    
  $scope.$watch('orderProperty', function() {
    if($scope.orderProperty) {
      $scope.sort = {name_sort: parseInt($scope.orderProperty)};
    }
  });
});
        