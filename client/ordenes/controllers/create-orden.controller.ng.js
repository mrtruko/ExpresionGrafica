'use strict'

angular.module('graficaExpresionApp').controller('CreateOrdenCtrl', function($scope) {
    $scope.ordenes = $scope.$meteorCollection(Ordenes).subscribe("ordenes");
    $scope.clientes = $scope.$meteorCollection(Clientes).subscribe("clientes");
    $scope.productos = $scope.$meteorCollection(Productos).subscribe("productos");
    $scope.empresas = $scope.$meteorCollection(Empresas).subscribe("empresas");
    console.log($scope.productos);
    $scope.mostrarCliente = true;
    $scope.Math = window.Math;
    $scope.productosOrdenObjs = [];
    $scope.productosOrden = [];
    $scope.fecha = moment().format("DD-MM-YYYY");
    $scope.hora = moment().format("HH:mm");
    $scope.observacion ="";
    $scope.vendedora = $scope.currentUser.profile.displayName;
    $scope.fechaCompromiso ="";
    $scope.total = 0;
    $scope.neto = 0;
    $scope.abono1 = 0;
    $scope.iva = 0;
    $scope.saldo = 0;
    $scope.alerta = function(empresa){
        $scope.empresa = empresa;
    }
    $scope.alerta1 = function(cliente){
        $scope.cliente = cliente;
    }
    $scope.motrarCliente = function(){
        $scope.mostrarCliente = true;
    }
    $scope.mostrarEmpresa = function(){
        $scope.mostrarCliente = false;
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