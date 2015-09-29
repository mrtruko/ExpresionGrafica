'use strict'

angular.module('graficaExpresionApp').controller('CreateOrdenCtrl', function($scope) {
    $scope.ordenes = $scope.$meteorCollection(Ordenes).subscribe("ordenes");
    $scope.clientes = $scope.$meteorCollection(Clientes).subscribe("clientes");
    $scope.productos = $scope.$meteorCollection(Productos).subscribe("productos");
    $scope.empresas = $scope.$meteorCollection(Empresas).subscribe("empresas");
    $scope.orden = {};
    console.log($scope.productos);
    $scope.mostrarCliente = true;
    $scope.Math = window.Math;
    $scope.productosOrdenObjs = [];
    $scope.orden.productosOrden = [];
    $scope.orden.fecha = moment().format("DD-MM-YYYY");
    $scope.orden.hora = moment().format("HH:mm");
    $scope.orden.observacion ="";
    $scope.orden.vendedora = $scope.currentUser.profile.displayName;
    $scope.orden.fechaCompromiso ="";
    $scope.orden.total = 0;
    $scope.orden.neto = 0;
    $scope.orden.abono1 = 0;
    $scope.orden.iva = 0;
    $scope.orden.saldo = 0;








    $scope.saveOrden = function() {
        if($scope.mostrarCliente){
            $scope.orden.cliente = $scope.cliente._id;

        }else{
            $scope.orden.empresa = $scope.empresa._id;
        }
    console.log($scope.orden);
        Ordenes.insert($scope.orden,function(error,result){
            if(error){
                console.log(error);
                $scope.msgAlerta(error,"error");
            }else if(result){
                $scope.msgAlerta("Orden Guardada.","success");
                $scope.orden = {};
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
            $scope.orden.productosOrden.push({'id':producto._id, 'codigo':producto.codigo, 'nombreProducto': producto.nombreProducto,'precio':0, 'cantidad':0,'precioComercial':producto.precioComercial,'precioAgencia':producto.precioAgencia,'cantidadP':producto.cantidad });
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
        $scope.saldo = $scope.total - abono1;
    }
    $scope.calcularTotal =  function(){
        $scope.total = 0;
        angular.forEach($scope.orden.productosOrden, function(value, key) {
            $scope.total = $scope.total + value.precio;
            console.log($scope.total);
        });
        $scope.neto = window.Math.round($scope.total / 1.19);
        $scope.iva = $scope.total - $scope.neto;
        $scope.abono();
    }
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

    }


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