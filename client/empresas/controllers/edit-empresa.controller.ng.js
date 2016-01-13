'use strict'

angular.module('graficaExpresionApp')
    .controller('EditEmpresasCtrl', function($scope, $stateParams, $state) {
        $scope.empresa = $scope.$meteorObject(Empresas, $stateParams.empresaId, false);
        $scope.$meteorSubscribe('empresas');
        $scope.save = function(regresar) {
            if($scope.empresa.contactos.length === 0){
                $scope.msgAlerta("Ingrese almenos 1 Contacto","error");
                return;
            }
            $scope.empresa.save().then(
                function(numberOfDocs) {
                    $scope.msgAlerta("Cliente Guardado.","success");
                    if(regresar)
                        $state.go("empresas");
                },
                function(error) {
                    $scope.msgAlerta(error,"error");
                }
            )

        };
        $scope.agregarContacto = function(){
            $scope.empresa.contactos.push({});

        }
        $scope.eliminarContacto = function(contacto){
            $scope.empresa.contactos.splice(contacto,1);
        }
        $scope.reset = function() {
            $scope.empresa.reset();
        };
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
    });