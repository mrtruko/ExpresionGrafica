'use strict'

angular.module('graficaExpresionApp')
    .controller('ProveedorFacturaCtrl', function($scope, $stateParams, $reactive) {
        $scope.empresas = $scope.$meteorCollection(Empresas).subscribe('empresas');
        $reactive(this).attach($scope);
        this.subscribe('uploads');
        $scope.factura = {};
        $scope.facturaSeleccionada = null;
        var _selected;
        $scope.selected = undefined;
        $scope.editar = true;
        $scope.clienteSeleccionado = function(item, model, label){
            if(model){
                if(model._id){
                    $scope.empresa = model;
                    $scope.factura.idEmpresa = model._id;
                    $scope.facturas = $scope.$meteorCollection(function() {
                        return Facturas.find({idEmpresa:model._id});
                    }).subscribe("facturas");
                }
            }
        }
        $scope.addImages = function(files) {
            if (files.length > 0) {
                console.log(files);
                for (var i = 0, ln = files.length; i < ln; i++) {
                    console.log(files[i]);
                    Uploads.insert(files[i], function (err, fileObj){
                        if(err){
                            $scope.msgAlerta("Error al subir un archivo intente de nuevo","error");
                        }else{
                            $scope.factura.factura = fileObj._id;
                            $scope.factura.facturaImg = fileObj;

                           // $scope.producSelec.url.push(fileObj.url({brokenIsFine: true}));
                            //$scope.producSelec.archivos.push(fileObj);
                            $scope.$apply();
                        }

                        // });
                    });
                }
            }
        };
        $scope.addImages2 = function(files) {
            console.log($scope.factura);
            if (files.length > 0) {
                console.log(files);
                for (var i = 0, ln = files.length; i < ln; i++) {
                    console.log(files[i]);
                    Uploads.insert(files[i], function (err, fileObj){
                        if(err){
                            $scope.msgAlerta("Error al subir un archivo intente de nuevo","error");
                        }else{
                            $scope.factura.archivoComprobante = fileObj._id;
                            $scope.factura.archivoComprobanteImg = fileObj;

                            // $scope.producSelec.url.push(fileObj.url({brokenIsFine: true}));
                            //$scope.producSelec.archivos.push(fileObj);
                            $scope.$apply();
                        }
                    });
                }
            }
        };
        $scope.saveEdit = function(){

            Facturas.update($scope.factura._id,{$set:$scope.factura}, function(error, result){
                if(result){
                    $scope.msgAlerta("Factura Guardada.","success");
                    $scope.factura = {estado:"No Pagado",tipoPago:"Cheque",idEmpresa:$scope.empresa._id};
                    $scope.$apply();
                }else if(error){
                    $scope.msgAlerta("Error.","error");
                    console.log(error);
                }
            });

        }
        $scope.save = function(){
            console.log($scope.factura);
            Facturas.insert($scope.factura, function(error, result){
               if(result){
                   $scope.msgAlerta("Factura Guardada.","success");
                   $scope.factura = {estado:"No Pagado",tipoPago:"Cheque",idEmpresa:$scope.empresa._id};

               }else if(error){
                   $scope.msgAlerta("Error.","error");
                   console.log(error);
               }
            });
        }
        $scope.cargarFactura = function(id){
            $scope.factura = $scope.$meteorObject(Facturas, id, false);
            $scope.factura.facturaImg = $scope.cargarArchivo($scope.factura.factura);
            if($scope.factura.archivoComprobante)
                $scope.factura.archivoComprobanteImg = $scope.cargarArchivo($scope.factura.archivoComprobante);
            $scope.editar = false;

        }
        $scope.editarFactura = function(id){
            $scope.factura = Facturas.findOne({_id:id});
            $scope.factura.facturaImg = $scope.cargarArchivo($scope.factura.factura);
            if($scope.factura.archivoComprobante)
                $scope.factura.archivoComprobanteImg = $scope.cargarArchivo($scope.factura.archivoComprobante);
            $scope.editar = true;

        }
        $scope.cargarArchivo = function(id){
            return Uploads.findOne({_id:id});
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