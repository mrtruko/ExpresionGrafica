'use strict'

angular.module('graficaExpresionApp')
.controller('ProveedoresCtrl', function($scope, $meteor) {
      $scope.proveedores = $scope.$meteorCollection(Proveedores).subscribe('proveedores');
      $scope.eliminarProveedor = function(id){
        $scope.proveedor = $meteor.object(Proveedores, id,false).subscribe("proveedores");
        console.log($scope.empresa);
        bootbox.dialog({
              title: "Desea Eliminar A: "+ $scope.proveedor.nombre,
              message: "Eliminando",
              buttons: {
                success: {
                  label: "Eliminar",
                  className: "btn-error",
                  callback: function () {
                    $scope.proveedores.remove($scope.proveedor);
                  }
                }
              }
            }
        );
      }

});