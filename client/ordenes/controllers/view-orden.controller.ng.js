'use strict'

angular.module('graficaExpresionApp')
    .controller('viewOrdenCtrl', function($scope,$stateParams) {
        $scope.orden = $scope.$meteorObject(Ordenes, $stateParams.idOrden, false);
        $scope.$meteorSubscribe('ordenes');
        $scope.$meteorSubscribe('clientes');
        $scope.$meteorSubscribe('empresas');

        $scope.$watch("[orden.cliente,orden.empresa]", function(newValue, oldValue) {
            if($scope.orden.cliente){
                $scope.orden.clienteO = $scope.$meteorObject(Clientes, $scope.orden.cliente, false);
                console.log($scope.orden.clienteO);
            }else if($scope.orden.empresa){
                $scope.orden.empresaO = $scope.$meteorObject(Empresas, $scope.orden.empresa, false);
                console.log($scope.orden.empresaO);
            }
        });

    });