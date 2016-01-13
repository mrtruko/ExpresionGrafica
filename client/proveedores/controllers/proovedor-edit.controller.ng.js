'use strict'

angular.module('graficaExpresionApp')
    .controller('ProveedorEditCtrl', function($scope, $stateParams, $state) {
        $scope.proveedor = $scope.$meteorObject(Proveedores, $stateParams.idProveedor, false);
        $scope.$meteorSubscribe('proveedores');
        console.log($stateParams.idProveedor);
        $scope.save = function(regresar) {
            console.log($scope.proveedor);
            $scope.proveedor.save().then(
                function(numberOfDocs) {
                    $scope.msgAlerta("Proveedor Guardado.","success");
                    if(regresar)
                        $state.go("proveedores");
                },
                function(error) {
                    $scope.msgAlerta(error,"error");
                }
            );
        };
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