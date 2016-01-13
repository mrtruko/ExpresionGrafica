'use strict'

angular.module('graficaExpresionApp')
    .controller('CotizacionRevisarCtrl', function($scope, $stateParams,$location) {
        //$scope.cotizaciones = $scope.$meteorCollection(Cotizacion).subscribe("cotizacion");
        $scope.orden = $scope.$meteorObject(Cotizacion, $stateParams.idCotizacion,false);
        console.log($scope.orden);
        $scope.$meteorSubscribe('cotizacion');
        $scope.$meteorSubscribe('clientes');
        $scope.$meteorSubscribe('empresas');
        $scope.$meteorSubscribe('productos');

        $scope.$watch("[orden.cliente,orden.empresa]", function(newValue, oldValue) {

            if($scope.orden.cliente){
                $scope.orden.clienteO = $scope.$meteorObject(Clientes, $scope.orden.cliente, false);
                console.log($scope.orden.clienteO);
            }else if($scope.orden.empresa){
                $scope.orden.empresaO = $scope.$meteorObject(Empresas, $scope.orden.empresa, false);
                console.log($scope.orden.empresaO);
            }
        });
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

    });