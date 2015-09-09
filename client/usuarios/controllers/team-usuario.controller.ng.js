'use strict'

angular.module('graficaExpresionApp')
    .controller('TeamUsuariosCtrl', function($scope,$meteor,$rootScope, $state) {
        $scope.users = $meteor.collection(Meteor.users, false).subscribe("users");
        console.log($scope.users)
    });