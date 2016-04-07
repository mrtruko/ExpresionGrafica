'use strict'

angular.module('graficaExpresionApp')
.controller('ProveedoresCtrl', function($scope, $meteor,$reactive,sharedProperties, $location) {
      $scope.facturas = $scope.$meteorCollection(Facturas).subscribe('facturas');
    $reactive(this).attach($scope);
    this.subscribe('empresas');
      $scope.eliminarProveedor = function(id){
        $scope.factura = $meteor.object(Facturas, id,false).subscribe("facturas");
        console.log($scope.empresa);
        bootbox.dialog({
              title: "Desea Eliminar a: "+ $scope.factura.nombre +" de su listado de Facturas?",
              message: "En espera de eliminación",
              buttons: {
                success: {
                  label: "Eliminar",
                  className: "btn-error",
                  callback: function () {
                    $scope.proveedores.remove($scope.factura);
                  }
                }
              }
            }
        );
      }
    $scope.cargarEmpresa = function(id){
        console.log(id);
        return Empresas.findOne({_id:id});
    }
    $scope.abrirDetalle = function(id){
    sharedProperties.setProperty(id);
        $location.path('factura');
    }

}).service('sharedProperties', function () {
    var property = null;

    return {
        getProperty: function () {
            return property;
        },
        setProperty: function(value) {
            property = value;
        }
    };
});