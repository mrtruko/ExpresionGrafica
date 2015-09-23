angular.module('graficaExpresionApp').controller('ClientesCreateCtrl', function($scope) {
    $scope.clientes = $scope.$meteorCollection(Clientes, false);
    $scope.cliente = {};
    $scope.save = function() {
        Clientes.insert($scope.cliente,function(error,result){
            if(error){
                $scope.msgAlerta(error,"error");

            }else if(result){
                $scope.msgAlerta("Producto Guardado.","success");
                $scope.cliente = {};
            }
        });
    };
    $scope.msgAlerta = function(msg,tipo){
        Messenger.options = {
            extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
            theme: "future"
        }
        Messenger().post({
            message:msg,
            showCloseButton: true,
            type: tipo
        });

    }
    });