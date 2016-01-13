angular.module('graficaExpresionApp')
    .controller('ClienteEditCtrl', function($scope, $stateParams, $meteor, $state) {
        $scope.cliente = $scope.$meteorObject(Clientes, $stateParams.clienteId, false);
        $scope.$meteorSubscribe('clientes');

        $scope.save = function(regresar) {
            $scope.cliente.save().then(
                function(numberOfDocs) {
                    $scope.msgAlerta("Cliente Guardado.","success");
                    if(regresar)
                        $state.go('clientes');
                },
                function(error) {
                    $scope.msgAlerta(error,"error");
                }
            )

        };

        $scope.reset = function() {
            $scope.cliente.reset();
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