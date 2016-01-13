'use strict'

angular.module('graficaExpresionApp')
    .controller('ProveedorCtrl', function($scope, $state) {
        $scope.proveedores = $scope.$meteorCollection(Proveedores, false);
        $scope.proveedor = {};
        $scope.save = function(regresar) {
            console.log($scope.proveedor);
            Proveedores.insert($scope.proveedor,function(error,result){
                if(error){
                    $scope.msgAlerta(error,"error");
                }else if(result){
                    $scope.msgAlerta("Proveedor Guardado.","success");
                    $scope.proveedor = {};
                    if(regresar)
                        $state.go("proveedores");
                }
            });
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