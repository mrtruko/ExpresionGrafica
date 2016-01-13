'use strict'

angular.module('graficaExpresionApp')
    .controller('PerfilUsuariosCtrl', function($scope,$meteor,$rootScope, $state) {
        $scope.user = $scope.$meteorObject(Meteor.users, Meteor.userId(), false);
        $scope.passw = {};
    console.log($scope.user );
        $scope.save = function() {
           $scope.user.profile.displayName = $scope.user.profile.nombre + " " + $scope.user.profile.apellido;
            console.log($scope.user.profile.dislayName);
            $scope.user.save().then(

                function(numberOfDocs) {
                    $scope.msgAlerta("Guardado.","success");
                },
                function(error) {
                    console.log(error);
                    $scope.msgAlerta(error,"error");
                }
            );
        };
        $scope.pass = function(){
            console.log($scope.passw);
            if(!$scope.passw.nueva || !$scope.passw.repetirnueva || !$scope.passw.antigua){
                $scope.msgAlerta("Ingrese Contraseñas","error");
                return null;
            }


            if($scope.passw.nueva == $scope.passw.repetirnueva){
                Accounts.changePassword($scope.passw.antigua, $scope.passw.nueva, function(error){
                    if(error){
                        $scope.msgAlerta(error,"error");
                    }else{
                        $scope.msgAlerta("Guardado.","success");
                    }
                })
            }else{
                $scope.msgAlerta("Contraseñas No Concuerdan","error");
            }


        }
        $scope.msgAlerta = function(msg,tipo){
            Messenger.options = {
                extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
                theme: "future"
            }
            Messenger().post({
                message:msg,
                showCloseButton: true,
                type: tipo
            });

        }

    });