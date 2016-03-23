'use strict'

angular.module('graficaExpresionApp')
    .controller('CreateEmpresasCtrl', function($scope, $state) {
        $scope.empresas = $scope.$meteorCollection(Empresas, false);
        $scope.empresa = {};
        $scope.empresa.contactos = [];
        $scope.save = function(regresar) {

            if($scope.empresa.contactos.length === 0){
                $scope.msgAlerta("Ingrese almenos 1 Contacto","error");
                return;
            }
            Empresas.insert($scope.empresa,function(error,result){
                if(error){
                    $scope.msgAlerta(error,"error");

                }else if(result){
                    $scope.msgAlerta("Empresa Guardada.","success");
                    $scope.empresa = {};
                    $scope.empresa.contactos = [];
                    if(regresar)
                        $state.go("empresar");
                }
            });
        };
        $scope.agregarContacto = function(){
            $scope.empresa.contactos.push({});
        };
        $scope.eliminarContacto = function(contacto){
            $scope.empresa.contactos.splice(contacto,1);
        };
        $scope.msgAlerta = function(msg,tipo){
            Messenger.options = {
                extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
                theme: "future"
            };
            Messenger().post({
                message:msg,
                showCloseButton: true,
                type: tipo
            });

        }
    });