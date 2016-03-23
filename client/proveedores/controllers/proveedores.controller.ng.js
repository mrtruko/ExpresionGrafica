'use strict'

angular.module('graficaExpresionApp')
.controller('ProveedoresCtrl', function($scope, $meteor) {
      $scope.facturas = $scope.$meteorCollection(Facturas).subscribe('facturas');
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

});