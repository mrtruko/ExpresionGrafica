'use strict'
angular.module('graficaExpresionApp')
    .controller('ProductoMovimientoCtrl', function($scope, $stateParams, $meteor, $state) {
        $scope.producto = $scope.$meteorObject(Productos, $stateParams.productoId,false);
        $scope.$meteorSubscribe('productos');
        $scope.movimiento = {};

        $scope.save = function(regresar) {
            $scope.stock = true;
            if ($scope.movimiento.cantidad % 1 === 0){
                if($scope.movimiento.tipo=== "Descuento" || $scope.movimiento.tipo ==="Incremento"){
                    if($scope.movimiento.motivo !==""){
                        if($scope.movimiento.cantidad > $scope.producto.cantidad){
                            $scope.stock = false;
                        }
                        if($scope.movimiento.tipo==="Descuento"){
                            if($scope.stock){
                                $scope.producto.cantidad = $scope.producto.cantidad - $scope.movimiento.cantidad;
                            }

                        }else{
                            $scope.producto.cantidad = parseInt($scope.producto.cantidad) + parseInt($scope.movimiento.cantidad);
                            $scope.stock = true;
                        }
                        if($scope.stock){
                            $scope.movimiento.fecha = moment().format("DD/MM/YYYY HH:mm");
                            $scope.movimiento.responsable = $scope.currentUser.profile.displayName;
                            $scope.producto.movimientos.push($scope.movimiento);
                            //console.log($scope.producto);
                            $scope.producto.save().then(
                                function(numberOfDocs) {
                                    $scope.msgAlerta("Producto Guardado.","success");
                                    console.log(regresar);
                                    if(regresar)
                                        $state.go("productos-list");
                                },
                                function(error) {
                                    $scope.msgAlerta(error,"error");
                                }
                            )
                            $scope.movimiento = {};
                        }else{
                            $scope.msgAlerta("Stock Insuficiente","error");
                        }
                    }else{
                        $scope.msgAlerta("Debe Ingresar el motivo","error");
                    }
                }else{
                    $scope.msgAlerta("Ingrese El Tipo de Movimiento","error");
                }
            }else{
                $scope.msgAlerta("Ingrese Un Numero","error");
            }

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
angular.module('graficaExpresionApp').filter('reverse', [
    function() {
        return function(items) {
            if(items){
                return items.slice().reverse();
            }else{
                return;
            }

        };
    }
]);