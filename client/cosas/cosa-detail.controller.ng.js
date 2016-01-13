'use strict'

angular.module('graficaExpresionApp')
.controller('CosaDetailCtrl', function($scope, $stateParams, $meteor) {
  $scope.cosa = $scope.$meteorObject(Cosas, $stateParams.cosaId);
  $scope.$meteorSubscribe('cosas');
  
  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.cosa.save().then(
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
    $scope.cosa.reset();
  };
});