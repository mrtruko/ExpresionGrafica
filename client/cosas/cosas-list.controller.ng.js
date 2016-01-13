'use strict'

angular.module('graficaExpresionApp')
.controller('CosasListCtrl', function($scope, $meteor) {
  $scope.page = 1
  $scope.perPage = 3
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1'
  
  $scope.cosas = $scope.$meteorCollection(function() {
    return Cosas.find({}, {sort:$scope.getReactively('sort')});
  });
  $meteor.autorun($scope, function() {
    $scope.$meteorSubscribe('cosas', {
      limit: parseInt($scope.getReactively('perPage')),
      skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
      sort: $scope.getReactively('sort')
    }, $scope.getReactively('search')).then(function() {
      $scope.cosasCount = $scope.$meteorObject(Counts, 'numberOfCosas', false);
    });
  });

  $meteor.session('cosasCounter').bind($scope, 'page');
    
  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.cosas.save($scope.newCosa);
      $scope.newCosa = undefined;
    }
  };
      
  $scope.remove = function(cosa) {
    $scope.cosas.remove(cosa);
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
        