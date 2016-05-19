'use strict'

angular.module('graficaExpresionApp')
    .controller('ProveedorFacturaCtrl', function($scope, $stateParams, $reactive,sharedProperties) {
        $reactive(this).attach($scope);
        this.subscribe('uploads');
        this.subscribe('facturas');
        this.subscribe('empresas');
        this.helpers({
                    empresas: () => Empresas.find({}),
        });

        this.factura = {};
        $scope.modal = false;
        $scope.facturaSeleccionada = null;
        $scope.facturaImg = null;
        $scope.comprobanteImg = null;
        $scope.selected = undefined;
        $scope.editar = true;
        $scope.PropiedadCompartida = sharedProperties.getProperty();
        sharedProperties.setProperty(null);


        $scope.clienteSeleccionado = function(item, model, label){
            if(model){
                if(model._id){
                    $scope.facturaEdita.empresa = model;
                    $scope.facturaEdita.factura.idEmpresa = model._id;
                    $scope.facturaEdita.helpers({
                            facturas: () => Facturas.find({idEmpresa:model._id}),
                    });
                    //console.log(this.facturas);

                }
            }
        }
        $scope.cargarFacturaClick = function(){

            if($scope.PropiedadCompartida){
                $scope.helpers({
                        factura: () => Facturas.findOne({_id:$scope.PropiedadCompartida}),
                    facturas: () => Facturas.find({idEmpresa:$scope.facturaEdita.factura.idEmpresa}),
                    empresa: () => Empresas.findOne({_id:$scope.facturaEdita.factura.idEmpresa}),
            });
                $scope.editar = false;
                $scope.modal = true;

                // Meteor.wrapAsync(func, [context])
               // $scope.facturaEdita.factura.facturaImg = $scope.cargarArchivo($scope.facturaEdita.factura.factura);
               // if($scope.facturaEdita.factura.archivoComprobante){
               //     $scope.facturaEdita.factura.archivoComprobanteImg = $scope.cargarArchivo($scope.facturaEdita.factura.archivoComprobante);
              //  }
                //console.log(Meteor.call('img',$scope.facturaEdita.factura.factura));
                //$scope.facturaEdita.factura.facturaImg = Meteor.call('img',$scope.facturaEdita.factura.factura);
                //console.log($scope.facturaEdita.factura.facturaImg);
                //if($scope.facturaEdita.factura.archivoComprobante)
                //$scope.facturaEdita.factura.archivoComprobanteImg = Uploads.findOne({_id:$scope.facturaEdita.factura.archivoComprobante});
               //
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
                            $scope.facturaEdita.factura.factura = fileObj._id;
                            $scope.facturaEdita.factura.facturaImg = fileObj;

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

            if (files.length > 0) {

                for (var i = 0, ln = files.length; i < ln; i++) {

                    Uploads.insert(files[i], function (err, fileObj){
                        if(err){
                            $scope.msgAlerta("Error al subir un archivo intente de nuevo","error");
                        }else{
                            $scope.facturaEdita.factura.archivoComprobante = fileObj._id;
                            $scope.facturaEdita.factura.archivoComprobanteImg = fileObj;

                            // $scope.producSelec.url.push(fileObj.url({brokenIsFine: true}));
                            //$scope.producSelec.archivos.push(fileObj);
                            $scope.$apply();
                        }
                    });
                }
            }
        };
        $scope.saveEdit = function(){
            Facturas.update($scope.facturaEdita.factura._id,{$set:$scope.factura}, function(error, result){
                if(result){
                    $scope.msgAlerta("Factura Guardada.","success");
                    $scope.facturaEdita.factura = {estado:"No Pagado",tipoPago:"Cheque",idEmpresa:$scope.facturaEdita.empresa._id};
                    $scope.$apply();
                }else if(error){
                    $scope.msgAlerta("Error.","error");
                    console.log(error);
                }
            });

        }
        $scope.save = function(){
            Facturas.insert($scope.facturaEdita.factura, function(error, result){
               if(result){
                   $scope.msgAlerta("Factura Guardada.","success");
                   $scope.facturaEdita.factura = {estado:"No Pagado",tipoPago:"Cheque",idEmpresa:$scope.facturaEdita.empresa._id};
                   $scope.$apply();
               }else if(error){
                   $scope.msgAlerta(error,"error");
                   console.log(error);
               }
            });
        }
        $scope.cargarArchivo = function(id){
            return Uploads.findOne({_id:id});
        }
        $scope.cargarFactura = function(id){
            $scope.modal = false;
            $scope.facturaEdita.helpers({
                    factura: () => Facturas.findOne({_id:id}),
        });
            $scope.facturaEdita.factura.facturaImg = $scope.cargarArchivo($scope.facturaEdita.factura.factura);
            if($scope.facturaEdita.factura.archivoComprobante)
                $scope.facturaEdita.factura.archivoComprobanteImg = $scope.cargarArchivo($scope.facturaEdita.factura.archivoComprobante);
            $scope.editar = false;
        }
        $scope.editarFactura = function(id){
            $scope.modal = false;
            $scope.facturaEdita.helpers({
                        factura: () => Facturas.findOne({_id:id}),
            });

            $scope.facturaEdita.factura.facturaImg = $scope.cargarArchivo($scope.facturaEdita.factura.factura);
            if($scope.facturaEdita.factura.archivoComprobante)
                $scope.facturaEdita.factura.archivoComprobanteImg = $scope.cargarArchivo($scope.facturaEdita.factura.archivoComprobante);
            $scope.editar = true;
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

            $scope.archivos = function(){

            }



    });