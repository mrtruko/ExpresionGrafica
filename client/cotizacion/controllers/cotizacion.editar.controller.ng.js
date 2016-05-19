'use strict'

angular.module('graficaExpresionApp')
    .controller('CotizacionEditCtrl', function($scope, $reactive,$stateParams,$q,$location) {
        $scope.ordenes = $scope.$meteorCollection(Ordenes).subscribe("ordenes");
        $scope.clientes = $scope.$meteorCollection(Clientes).subscribe("clientes");
        $scope.productos = $scope.$meteorCollection(Productos).subscribe("productosOrden");
        $scope.empresas = $scope.$meteorCollection(Empresas).subscribe("empresas");
        $scope.cotizacion = $scope.$meteorCollection(Cotizacion).subscribe("cotizacion");
        $scope.uploads = $scope.$meteorCollection(Uploads).subscribe("uploads");
        $scope.orden = $scope.$meteorObject(Cotizacion, $stateParams.idCotizacion,false);
        $scope.mostrarCliente = true;
        $scope.Math = window.Math;
        $scope.productosOrdenObjs = [];
        $scope.orden.productosOrden = [];
        $scope.orden.fecha = moment().format("DD-MM-YYYY");
        $scope.orden.hora = moment().format("HH:mm");
        $scope.orden.observacion ="";
        $scope.orden.responsable = $scope.currentUser.profile.displayName;
        $scope.orden.total = 0;
        $scope.orden.neto = 0;
        $scope.orden.iva = 0;
        $scope.orden.saldo = 0;
        $scope.hoy = moment().format("YYYY-MM-DD");
        $scope.mempresa = {};
        $scope.mempresa.contactos = [];
            $scope.pSelecionado = function(producto){
                    console.log(producto);
                    $scope.producSelec = producto;
            };
            $scope.cargarArchivo = function(id){
                    return Uploads.findOne({_id:id});
            }
            $scope.habilitar = function(producto){
                    if(producto.tipo === "especial"){
                            return true;
                    }else{
                            return false
                    }
            }
            $scope.calcularTotal = function(){

            }
        $scope.guardado = function(){
            $scope.orden.save().then(
                function(numberOfDocs) {
                    $scope.msgAlerta("Cotizacion Actualizada","success");
                },
                function(error) {
                    $scope.msgAlerta("Error Orden Productos Contactar Administrador"+error,"error");
                    $scope.errorProductos = true;
                }
            );
        }
        $scope.revisar = function(){
            $scope.stock = {};
            $scope.stock.generar = true;
            $scope.stock.productos = [];
            $scope.stock.productosDetalle = [];
            angular.forEach($scope.orden.productosOrden, function(valuePro, keyPro) {
                if(valuePro.codigo==="espec"){
                    return;
                }
                var deferred = $q.defer();
                Meteor.call('validarStock', valuePro.id,valuePro.cantidad,
                    function(err,response){
                        deferred.resolve(response);
                        if(!err){
                           if(response){

                               $scope.stock.productosDetalle.push("Producto: "+valuePro.codigo+ " Desc: "+valuePro.nombreProducto+". CON STOCK");
                           } else{
                               $scope.stock.productosDetalle.push("Producto: "+valuePro.codigo+ " Desc: "+valuePro.nombreProducto+". SIN STOCK");
                               $scope.stock.generar = false;

                           }
                        }else{
                            console.log(err);
                        }
                        $scope.$apply();
                    });
                $scope.stock.productos.push(deferred.promise);

            })

            $q.all($scope.stock.productos).then(
                // success
                // results: an array of data objects from each deferred.resolve(data) call
                function(results) {
                    if($scope.stock.generar){
                        $scope.saveOrden();
                    }else{
                        $("#box-config4").modal()
                    }

                },
                // error
                function(response) {
                    console.log(response, "response ");

                }
            );

        }
        $scope.generar = function(){
            $scope.revisar();
        }
        $scope.calcularTotal =  function(){

            $scope.orden.total = 0;
            angular.forEach($scope.orden.productosOrden, function(value, key) {
                $scope.orden.total = Number($scope.orden.total) + Number(value.precioTotal);

            });
            $scope.orden.neto = window.Math.round($scope.orden.total / 1.19);
            $scope.orden.iva = $scope.orden.total - $scope.orden.neto;
            $scope.abono();
        };
       // ng-change=";"
        $scope.calcular = function(produc){
            produc.precioTotal=((produc.precioVenta*produc.cantidad)*(produc.ancho*produc.alto))-((((produc.precioVenta*produc.cantidad)*(produc.ancho*produc.alto))/100)*produc.descuento);
            $scope.calcularTotal();
        }
        $scope.abono = function(){

            if(  $scope.orden.abono >  $scope.orden.total ){
                $scope.orden.abono = $scope.orden.total
            }

            $scope.orden.saldo = $scope.orden.total - $scope.orden.abono;

        };
        $scope.saveOrden = function() {
            //console.log($scope.orden);
            $scope.ordenC = {};
            $scope.ordenC.cliente = $scope.orden.cliente;
            $scope.ordenC.abono = $scope.orden.abono;
            $scope.ordenC.saldo = $scope.orden.saldo;
            $scope.ordenC.empresa = $scope.orden.empresa;
            $scope.ordenC.contactoEmpresa = $scope.orden.contactoEmpresa;
            $scope.ordenC.observacion = $scope.orden.observacion;
            $scope.ordenC.responsable = $scope.orden.responsable;
            $scope.ordenC.mostrarCliente = $scope.orden.mostrarCliente;
            $scope.ordenC.fecha = $scope.orden.fecha;
            $scope.ordenC.fechaCompromiso = $scope.orden.fechaCompromiso;
            $scope.ordenC.iva = $scope.orden.iva;
            $scope.ordenC.total = $scope.orden.total;
            $scope.ordenC.neto = $scope.orden.neto;
            $scope.ordenC.documento = $scope.orden.documento;
            $scope.ordenC.banco = $scope.orden.banco;
            $scope.ordenC.productosOrden = $scope.orden.productosOrden;
            $scope.ordenC.estado = "inicial";
            Ordenes.insert($scope.ordenC,function(error,result){
                if(error){
                    $scope.msgAlerta(error,"error");
                }else if(result){
                    $scope.errorProductos = false;
                    angular.forEach($scope.ordenC.productosOrden, function(valuePro, keyPro) {
                        if(valuePro.codigo==="espec"){
                            return;
                        }
                        console.log(valuePro.id);
                        $scope.producto = $scope.$meteorObject(Productos, valuePro.id, false);
                        $scope.producto.cantidad = $scope.producto.cantidad - valuePro.cantidad;
                        if(!$scope.producto.movimientos){
                            //console.log("arreglo")
                            $scope.producto.movimientos = [];
                        }else{
                            //console.log($scope.producto.movimientos);
                        }
                        console.log($scope.producto);
                        $scope.movimiento = {};
                        $scope.movimiento.responsable = $scope.currentUser.profile.displayName;
                        $scope.movimiento.cantidad = 1;
                        $scope.movimiento.fecha = moment().format("DD/MM/YYYY HH:mm");
                        $scope.movimiento.orden = "Orden de Trabajo: "+result;
                        $scope.movimiento.tipo = "orden";
                        //console.log(" Cantidad myust be a numbera");
                        //console.log($scope.movimiento);
                        $scope.producto.movimientos.push($scope.movimiento);
                        $scope.producto.save().then(
                            function(numberOfDocs) {

                            },
                            function(error) {
                                $scope.msgAlerta("Error Orden Productos Contactar Administrador"+error,"error");
                                $scope.errorProductos = true;
                            }
                        );
                    });
                    $location.path('orden/' + result);
                    //console.log('orden/' + result);
                    $scope.msgAlerta("Orden Guardada.","success");
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