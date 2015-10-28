'use strict'

angular.module('graficaExpresionApp')
.controller('EditarUsuarioCtrl', function($scope, $stateParams, $meteor) {
      $scope.usuario = $meteor.object(Meteor.users, $stateParams.usuarioId,false).subscribe("users");
      console.log($scope.usuario);

      $scope.guardar = function(x){
        $scope.usuario.profile.displayName = $scope.usuario.profile.nombre + " " + $scope.usuario.profile.apellido;
        $scope.usuario.save().then(function(numberOfDocs){
          $scope.msgAlerta("Guardado","success");
        }, function(error){
          $scope.msgAlerta("Error Al Guardar","error");
        });
      }





      $scope.msgAlerta = function(msg,tipo){
        Messenger.options = {
          extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
          theme: "future"
        }
        //Call
        Messenger().post({
          message:msg,
          showCloseButton: true,
          type: tipo
        });

      }
}).run(function($rootScope) {
        $rootScope.globalRoles = function(roles) {
            if (Roles.userIsInRole(Meteor.user(), roles)) {
                // NOTE: This example assumes the user is not using groups.
                return true;
            }else{
                return false;
            }
        };
    });