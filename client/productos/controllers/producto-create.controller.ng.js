angular.module('graficaExpresionApp')
    .controller('ProductosCreateCtrl', function($scope, $stateParams, $meteor, $state) {
        $scope.productos = $scope.$meteorCollection(Productos, false);
        $scope.save = function(regresar) {
            $scope.producto.movimientos = [];
                Productos.insert($scope.producto,function(error,result){
                    if(error){
                        console.log(error);
                        $scope.msgAlerta(error,"error");
                    }else if(result){
                        $scope.msgAlerta("Producto Guardado.","success");
                        $scope.producto = {};
                        if(regresar)
                            $state.go("productos-list");
                    }
                });
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