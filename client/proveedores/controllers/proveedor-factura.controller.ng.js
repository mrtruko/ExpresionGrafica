'use strict'

angular.module('graficaExpresionApp')
    .controller('ProveedorFacturaCtrl', function($scope, $stateParams) {
        $scope.proveedor = $scope.$meteorObject(Proveedores, $stateParams.idProveedor, false);
        $scope.$meteorSubscribe('proveedores');
        console.log($stateParams.idProveedor);
        $scope.factura = {};
        $scope.factura.tipoPago = "Cheque";
        $scope.factura.estado = "No Pagado";
        $scope.save = function() {
            console.log($scope.proveedor);
            if(!$scope.proveedor.facturas)
                     $scope.proveedor.facturas = [];
            console.log($scope.factura);
            $scope.factura.fecha = moment($scope.fechasel).format("DD-MM-YYYY");
            if($scope.fechasel2){
                $scope.factura.fechaPago = moment($scope.fechasel2).format("DD-MM-YYYY");
            }
            $scope.factura.fecha = moment($scope.fechasel).format("DD-MM-YYYY");
            if(!$scope.factura.numeroFactura){
                $scope.msgAlerta("Ingrese Numero de la factura","error");
                return;
            }
            if(!$scope.factura.fecha){
                $scope.msgAlerta("Ingrese fecha de la factura","error");
                return;
            }
            if(!$scope.factura.monto){
                $scope.msgAlerta("Ingrese Monto de la factura","error");
                return;
            }
            if(!$scope.factura.factura){
                $scope.msgAlerta("Ingrese una imagen o respaldo de la factura","error");
                return;
            }
            $scope.proveedor.facturas.push($scope.factura);
            $scope.proveedor.save().then(
                function(numberOfDocs) {
                    $scope.msgAlerta("Proveedor Guardado.","success");
                    $scope.factura = {};
                    $scope.factura.tipoPago = "Cheque";
                    $scope.factura.estado = "No Pagado";
                    $scope.archivoComprobante = null;
                    $scope.archivoFactura = null;
                },
                function(error) {
                    $scope.msgAlerta(error,"error");
                }
            );
        };
        $scope.save2 = function() {
            console.log($scope.proveedor);
            if(!$scope.proveedor.facturas)
                $scope.proveedor.facturas = [];
            console.log($scope.factura);
            $scope.factura.fecha = moment($scope.fechasel).format("DD-MM-YYYY");
            if($scope.fechasel2){
                $scope.facturaSeleccionada.fechaPago = moment($scope.fechasel2).format("DD-MM-YYYY");
            }
            $scope.facturaSeleccionada.fecha = moment($scope.fechasel).format("DD-MM-YYYY");
            if(!$scope.facturaSeleccionada.numeroFactura){
                $scope.msgAlerta("Ingrese Numero de la factura","error");
                return;
            }
            if(!$scope.facturaSeleccionada.fecha){
                $scope.msgAlerta("Ingrese fecha de la factura","error");
                return;
            }
            if(!$scope.facturaSeleccionada.monto){
                $scope.msgAlerta("Ingrese Monto de la factura","error");
                return;
            }
            if(!$scope.facturaSeleccionada.factura){
                $scope.msgAlerta("Ingrese una imagen o respaldo de la factura","error");
                return;
            }

            $scope.proveedor.save().then(
                function(numberOfDocs) {
                    $scope.msgAlerta("Proveedor Guardado.","success");
                    $scope.factura = {};
                    $scope.factura.tipoPago = "Cheque";
                    $scope.factura.estado = "No Pagado";
                    $scope.archivoComprobante = null;
                    $scope.archivoFactura = null;
                },
                function(error) {
                    $scope.msgAlerta(error,"error");
                }
            );
        };

        $scope.addImages = function(files) {
            if (files.length > 0) {
                console.log(files);
                for (var i = 0, ln = files.length; i < ln; i++) {
                    console.log(files[i]);
                    Uploads.insert(files[i], function (err, fileObj){
                        if(err){
                            $scope.msgAlerta("Error al subir un archivo Intente denuevo","error");
                        }else{
                            console.log(fileObj.url({brokenIsFine: true}));
                            $scope.factura.factura = fileObj.url({brokenIsFine: true});
                            $scope.archivoFactura = fileObj;
                            console.log(fileObj);
                            $scope.$apply();
                        }

                        // });
                    });
                }
            }

        };
        $scope.selecFactura = function(factura){
            $scope.facturaSeleccionada = factura;
        }
        $scope.addImages2 = function(files) {
            if (files.length > 0) {
                console.log(files);
                for (var i = 0, ln = files.length; i < ln; i++) {
                    console.log(files[i]);
                    Uploads.insert(files[i], function (err, fileObj){
                        if(err){
                            $scope.msgAlerta("Error al subir un archivo Intente denuevo","error");
                        }else{
                            console.log(fileObj.url({brokenIsFine: true}));
                            $scope.factura.archivoComprobanteUrl = fileObj.url({brokenIsFine: true});
                            $scope.archivoComprobante = fileObj;
                            $scope.$apply();
                        }

                        // });
                    });
                }
            }

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