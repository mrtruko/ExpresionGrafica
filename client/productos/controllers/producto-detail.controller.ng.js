'use strict'

angular.module('graficaExpresionApp')
.controller('ProductoDetailCtrl', function($scope, $stateParams, $meteor, $state) {
  $scope.producto = $scope.$meteorObject(Productos, $stateParams.productoId, false);
  $scope.$meteorSubscribe('productos');
  
  $scope.save = function(regresar) {
    console.log($scope.producto.comerciable);
      $scope.producto.save().then(
        function(numberOfDocs) {
          $scope.msgAlerta("Producto Guardado.","success");
          if(regresar)
            $state.go("productos-list");
        },
        function(error) {
          $scope.msgAlerta(error,"error");
        }
      )

  };
        
  $scope.reset = function() {
    $scope.producto.reset();
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