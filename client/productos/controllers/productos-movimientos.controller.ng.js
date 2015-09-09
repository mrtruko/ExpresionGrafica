'use strict'
angular.module('graficaExpresionApp')
    .controller('ProductoMovimientoCtrl', function($scope, $stateParams, $meteor) {
        $scope.producto = $scope.$meteorObject(Productos, $stateParams.productoId,false);
        $scope.$meteorSubscribe('productos');
        $scope.movimiento = {};

        $scope.save = function() {
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
                            $scope.producto.movimientos.push({
                                "responsable":"nicolas",
                                "cantidad":$scope.movimiento.cantidad,
                                "tipo":$scope.movimiento.tipo,
                                "motivo":$scope.movimiento.motivo
                            });
                            console.log($scope.producto);
                            $scope.producto.save().then(
                                function(numberOfDocs) {
                                    $scope.msgAlerta("Producto Guardado.","success");
                                },
                                function(error) {
                                    console.log(error);
                                }
                            )
                            $scope.movimiento = {};

                        }else{
                            //$scope.error = "Stock Insuficiente";
                            //$scope.success = ""; // pIpe
                            $scope.msgAlerta("Stock Insuficiente","error");
                        }

                    }else{
                        //$scope.error = "Debe Ingresar el motivo"; // pIpe
                        //$scope.success = ""; // pIpe

                        $scope.msgAlerta("Debe Ingresar el motivo","error");
                    }

                }else{
                    //$scope.error = "Ingrese El Tipo de Movimiento"; // pIpe
                    //$scope.success = ""; // pIpe

                    $scope.msgAlerta("Ingrese El Tipo de Movimiento","error");

                }

            }else{
                //$scope.error = "Ingrese Un Numero"; // pIpe
                //$scope.success = ""; // pIpe
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