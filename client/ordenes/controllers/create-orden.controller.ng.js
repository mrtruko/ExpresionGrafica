'use strict'

angular.module('graficaExpresionApp').controller('CreateOrdenCtrl', function($scope, $location) {
    $scope.ordenes = $scope.$meteorCollection(Ordenes).subscribe("ordenes");
    $scope.clientes = $scope.$meteorCollection(Clientes).subscribe("clientes");
    $scope.productos = $scope.$meteorCollection(Productos).subscribe("productosOrden");
    $scope.empresas = $scope.$meteorCollection(Empresas).subscribe("empresas");
    $scope.cotizacion = $scope.$meteorCollection(Cotizacion).subscribe("cotizacion");
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
    $scope.orden.iva = 0;
    $scope.orden.saldo = 0;
    $scope.hoy = moment().format("YYYY-MM-DD");
    $scope.mempresa = {};
    $scope.mempresa.contactos = [];




    $scope.saveEmpresa = function() {

        if($scope.mempresa.contactos.length === 0){
            $scope.msgAlerta("Ingrese al menos 1 Contacto","error");
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
        Cotizacion.insert($scope.orden,function(error,result){
            if(error){
                $scope.msgAlerta(error,"error");
            }else if(result){

                $scope.msgAlerta("Cotizacion Guardada.","success");
                $location.path('cotizacion/' + result);
            }
        });
    }
    $scope.saveProducto = function() {
        $scope.mproducto.movimientos = [];
        Productos.insert($scope.mproducto,function(error,result){
            if(error){
                console.log(error);
                $scope.msgAlerta(error,"error");
            }else if(result){
                $scope.msgAlerta("Producto Guardado.","success");
                $scope.mproducto = {};
            }
        });
    };
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
        $scope.orden.estado = "inicial";
        Ordenes.insert($scope.orden,function(error,result){
            if(error){
                $scope.msgAlerta(error,"error");
            }else if(result){
                $scope.errorProductos = false;
                console.log($scope.orden);
                    angular.forEach($scope.orden.productosOrden, function(valuePro, keyPro) {
                        if(valuePro.codigo==="espec"){
                            return;
                        }
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
                                "fecha" : moment(),
                                "motivo":"Orden de Trabajo: "+$scope.orden.idOrden,
                                "tipo":"orden"
                            });
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
    $scope.contactoSelec = function(contacto){

        $scope.contactoSeleccionado = contacto;
        console.log($scope.contactoSeleccionado);
    }

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
        $scope.contactoSeleccionado = null;
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
            $scope.orden.productosOrden.push({
                'id':producto._id,
                'tipo':producto.tipo,
                'codigo':producto.codigo,
                'nombreProducto': producto.nombreProducto,
                'cantidad':1,
                'precioVenta':""+producto.precioComercial,
                'precioTotal':""+producto.precioComercial,
                'precioComercial':producto.precioComercial,
                'precioAgencia':producto.precioAgencia,
                'estado':"Pendiente",
                'descuento':"0",
                'cantidadP':producto.cantidad });
        }
        console.log($scope.orden.productosOrden);
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
    $scope.pSelecionado = function(producto){
        console.log(producto);
        $scope.producSelec = producto;
    };
    $scope.addImages = function(files) {
        if (files.length > 0) {
            console.log(files);
            for (var i = 0, ln = files.length; i < ln; i++) {
                console.log(files[i]);
               Uploads.insert(files[i], function (err, fileObj){
                   if(err){
                       $scope.msgAlerta("Error al subir un archivo intente de nuevo","error");
                   }else{
                       console.log($scope.producSelec.codigo);
                       console.log(fileObj.url({brokenIsFine: true}));
                       if(!$scope.producSelec.archivos)
                           $scope.producSelec.archivos = [];

                       if(!$scope.producSelec.url)
                           $scope.producSelec.url = [];

                       $scope.producSelec.url.push(fileObj.url({brokenIsFine: true}));
                       $scope.producSelec.archivos.push(fileObj);
                       $scope.$apply();
                   }

               // });
            });
        }
    }

    };
    $scope.descuentoA = function(){
        if($scope.cliente){
            if($scope.cliente.vip||$scope.cliente.agencia){
                return false;
            }
        }

        if($scope.empresa){
            if($scope.empresa.vip||$scope.empresa.agencia){
            return false;
            }
        }

        return true;
    }
    $scope.descuentoV = function(){
        if($scope.cliente){
            if($scope.cliente.vip){
                return false;
            }
        }

        if($scope.empresa){
            if($scope.empresa.vip){
                return false;
            }
        }

        return true;
    }
    $scope.eliminarArchivo = function(arhivo){
        $scope.producSelec.archivos.splice(arhivo,1);
    }


    $scope.abono = function(){

        if(  $scope.orden.abono >  $scope.orden.total ){
            $scope.orden.abono = $scope.orden.total
        }

        $scope.orden.saldo = $scope.orden.total - $scope.orden.abono;

    };


    $scope.calcularTotal =  function(){
        console.log($scope.cliente);
        console.log($scope.empresa);
        $scope.orden.total = 0;
        angular.forEach($scope.orden.productosOrden, function(value, key) {
            $scope.orden.total = Number($scope.orden.total) + Number(value.precioTotal);

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
                if($scope.contactoSeleccionado){
                    var l = document.getElementById('productosTab');
                    l.click();
                }else{
                    $scope.msgAlerta("Seleccione un contacto de Empresa","error");
                }

            }else{

                $scope.msgAlerta("Seleccione una Empresa","error");
            }
        }

    };

    $scope.wizClientes = function(){
        var l = document.getElementById('clientesTab');
        l.click();
    };
    $scope.wizOrden = function(){
        console.log($scope.orden);
        if(!$scope.orden.fechaCompromiso){
            $scope.msgAlerta("Ingrese Fecha de compromiso","error");
            return;
        }

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