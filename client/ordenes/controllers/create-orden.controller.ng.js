'use strict'

angular.module('graficaExpresionApp').controller('CreateOrdenCtrl', function($scope, $location, $modal) {
    $scope.ordenes = $scope.$meteorCollection(Ordenes).subscribe("ordenes");
    $scope.clientes = $scope.$meteorCollection(Clientes).subscribe("clientes");
    $scope.productos = $scope.$meteorCollection(Productos).subscribe("productos");
    $scope.empresas = $scope.$meteorCollection(Empresas).subscribe("empresas");
    $scope.orden = {};
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
    $scope.orden.abono1 = 0;
    $scope.orden.iva = 0;
    $scope.orden.saldo = 0;
    $scope.hoy = moment().format("YYYY-MM-DD");
    $scope.mempresa = {};
    $scope.mempresa.contactos = [];

    $scope.fecha = function(){
        $scope.orden.fechaCompromiso = moment($scope.fechasel).format("DD-MM-YYYY");

    };

    $scope.saveEmpresa = function() {

        if($scope.mempresa.contactos.length === 0){
            $scope.msgAlerta("Ingrese almenos 1 Contacto","error");
            return;
        }
        Empresas.insert($scope.mempresa,function(error,result){
            if(error){
                $scope.msgAlerta(error,"error");

            }else if(result){
                $scope.msgAlerta("Empresa Guardada.","success");
                $scope.mempresa = {};
                $scope.mempresa.contactos = [];
            }
        });
    };
    $scope.agregarContacto = function(){
        $scope.mempresa.contactos.push({});

    }
    $scope.eliminarContacto = function(contacto){
        $scope.mempresa.contactos.splice(contacto,1);
    }


    $scope.saveCotizacion = function(){
        if($scope.mostrarCliente){
            $scope.orden.cliente = $scope.cliente._id;

        }else{
            $scope.orden.empresa = $scope.empresa._id;
        }
        Cotizaciones.insert($scope.orden);
    }
    $scope.saveCliente = function() {
        Clientes.insert($scope.mcliente,function(error,result){
            if(error){
                $scope.msgAlerta(error,"error");
            }else if(result){
                $scope.msgAlerta("Cliente Guardado.","success");
                $scope.mcliente = {};
            }
        });
    };
    $scope.saveOrden = function() {
        if($scope.mostrarCliente){
            $scope.orden.cliente = $scope.cliente._id;
        }else{
            $scope.orden.empresa = $scope.empresa._id;
        }
        Ordenes.insert($scope.orden,function(error,result){
            if(error){
                $scope.msgAlerta(error,"error");
            }else if(result){
                $scope.msgAlerta("Orden Guardada.","success");
                    angular.forEach($scope.orden.productosOrden, function(valuePro, keyPro) {
                        $scope.producto = $scope.$meteorObject(Productos, valuePro.id, false);
                        $scope.producto.cantidad = $scope.producto.cantidad - valuePro.cantidad;
                        if(!$scope.producto.movimientos){
                            console.log("arreglo")
                            $scope.producto.movimientos = [];
                        }else{
                            console.log($scope.producto.movimientos);
                        }
                        console.log($scope.producto);
                        $scope.producto.movimientos.push({
                                "responsable":$scope.currentUser.profile.displayName,
                                "cantidad":valuePro.cantidad,
                                "fecha" : moment().format("DD/MM/YYYY HH:mm"),
                                "motivo":"Orden de Trabajo: "+result,
                                "tipo":"orden"
                            });
                        $scope.producto.save().then(
                            function(numberOfDocs) {

                            },
                            function(error) {
                                $scope.msgAlerta(error,"Error Orden Productos Contactar Administrador");
                            }
                        );
                    });

            }
        });
    };


    $scope.alerta = function(empresa){
        $scope.empresa = empresa;
        $scope.cliente = null;
        $scope.searchFish = "";
    };
    $scope.alerta1 = function(cliente){
        $scope.cliente = cliente;
        $scope.empresa = null;
        $scope.searchFish = "";
    };
    $scope.motrarCliente = function(){
        $scope.mostrarCliente = true;
        $scope.empresa = null;
    };
    $scope.mostrarEmpresa = function(){
        $scope.mostrarCliente = false;
        $scope.cliente = null;
    };
    $scope.alerta2 = function(producto){
        $scope.agregar = true;
        $scope.seguir = true;
        angular.forEach($scope.orden.productosOrden, function(value, key) {
            if($scope.seguir){
                if(producto.codigo===value.codigo){
                    $scope.agregar = false;
                    $scope.seguir = false;
                }else{
                    $scope.agregar = true;
                }
            }
        });
        if($scope.agregar){
            $scope.productosOrdenObjs.push(producto);

            $scope.orden.productosOrden.push({'id':producto._id,'tipo':producto.tipo, 'codigo':producto.codigo, 'nombreProducto': producto.nombreProducto,'precio':0, 'cantidad':0,'precioComercial':producto.precioComercial,'precioAgencia':producto.precioAgencia,'cantidadP':producto.cantidad });
        }
        $scope.calcularTotal();
    };
    $scope.eliminar = function(index){
        // remove the row specified in index
        $scope.orden.productosOrden.splice( index, 1);
        $scope.productosOrdenObjs.splice( index, 1);
        // if no rows left in the array create a blank array
        if ($scope.orden.productosOrden.length === 0){
            $scope.orden.productosOrden = [];
            $scope.productosOrdenObjs = []
        }
        $scope.calcularTotal();
    };

    $scope.abono = function(abono1){
        console.log(1);
        $scope.orden.saldo = $scope.orden.total - abono1;
    };
    $scope.calcularTotal =  function(){
        $scope.orden.total = 0;
        angular.forEach($scope.orden.productosOrden, function(value, key) {
            $scope.orden.total = $scope.orden.total + value.precio;

        });
        $scope.orden.neto = window.Math.round($scope.orden.total / 1.19);
        $scope.orden.iva = $scope.orden.total - $scope.orden.neto;
        $scope.abono();
    };

    $scope.wizProductos = function(){// validar cliente Seleccionado Empresa o Persona
        if($scope.mostrarCliente){
            if($scope.cliente){
                var l = document.getElementById('productosTab');
                l.click();
            }else{
                $scope.msgAlerta("Seleccione un Cliente","error");
            }
        }else{
            if($scope.empresa){

                var l = document.getElementById('productosTab');
                l.click();
            }else{
                $scope.msgAlerta("Seleccione una Empresa","error");
            }
        }

    };

    $scope.wizClientes = function(){
        var l = document.getElementById('clientesTab');
        l.click();
    }
    $scope.wizOrden = function(){
        var l = document.getElementById('ordenTab');
        l.click();
    }
    $scope.wizProductosbck = function(){// No Valida
        var l = document.getElementById('productosTab');
        l.click();
    }
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