'use strict'

angular.module('graficaExpresionApp')
    .controller('OrdenesDetalleCtrl', function($scope, $rootScope, $stateParams) {
        $scope.ordene = $scope.$meteorObject(Ordenes, $stateParams.idOrden);
        $scope.$meteorSubscribe('ordenes');
        $scope.producSelec = {}
        $scope.colaborador = {'id':$rootScope.currentUser._id,'url':$rootScope.currentUser.profile.imgPerfil};
        $scope.colaborando = false;
        $scope.finalizable = false;

        $scope.pSelecionado = function(producto){
            console.log(producto);
            $scope.producSelec = producto;
            console.log(producto);
        };
        $scope.terminada = function(){
            $scope.ordene.estado = "Finalizada";
        }
        $scope.entregadoF = function(){
            $scope.ordene.estado = "Entregado";
        }
        $scope.colaborar = function(){
            if(!$scope.ordene.colaboradores){
                $scope.ordene.colaboradores = [];
                console.log("colaborar");
            }else{
                console.log($scope.ordene.colaboradores);
            }
            if($scope.ordene.estado=="inicial"){
                $scope.ordene.estado="pendiente";
               // Ordenes.update({_id:$scope.ordene._id},{$set: {estado:  $scope.ordene.estado}});

            }

            console.log($scope.ordene);
            $scope.ordene.colaboradores.push($scope.colaborador);
            $scope.colaborando = true;



        };
        $scope.puedeEditar = function(producto){
            if($scope.colaborando)
                return false;
            if(!$scope.globalRoles(['admin','Gerente','Recepcionista'])){
                return true;
            }
            if(producto.estado == "finalizado"){
                return false;
            }

            if(producto.tipo == "Producto"){
                return false;
            }
            console.log("Puede Editar??");
            return true;
        };
        $scope.finalizar = function(){
            $scope.ordene.estado="Finalizado";
            $location.path("/ordenes");
        }
        $scope.$watch("ordene", function(newValue, oldValue) {
            console.log(newValue);
            console.log(oldValue);

            $scope.ordene.save();
        });
        $scope.$watch("ordene.colaboradores", function(newValue, oldValue) {
            console.log("cambio colaboradores");
            angular.forEach($scope.ordene.colaboradores, function(valuePro, keyPro) {
                if(!$scope.colaborando){
                    if(valuePro.id===$rootScope.currentUser._id){
                        $scope.colaborando = true;
                    }else{
                        $scope.colaborando = false;
                    }
                }


            });
        });
        $scope.$watch("ordene.productosOrden", function(newValue, oldValue) {
            $scope.finalizado = 0;
            $scope.sub = 0;
            $scope.entregado = 0;
            $scope.progreso = false;
            $scope.totalProg = 0;
            $scope.totalRealizado = 0;
            angular.forEach($scope.ordene.productosOrden, function(valuePro, keyPro) {
                if(valuePro.tipo == "Sub-Producto"){
                    $scope.sub++;
                    if(valuePro.estado != "Pendiente"){
                        $scope.progreso = true;
                    }
                    $scope.totalProg = $scope.totalProg  + (valuePro.cantidad * 2);
                    if(isNaN(valuePro.realizados)){
                        valuePro.realizados = 0;
                    }
                    if(isNaN(valuePro.entregados)){
                        valuePro.entregados = 0;
                    }
                    $scope.totalRealizado = $scope.totalRealizado + valuePro.realizados + valuePro.entregados;
                    console.log($scope.totalRealizado );
                }
                if(valuePro.estado=="finalizado" && valuePro.tipo == "Sub-Producto"){
                    $scope.finalizado++;
                }
                if(valuePro.estado=="entregado"){
                    $scope.entregado++;
                }
            });
            //console.log($scope.totalProg);
            //console.log($scope.totalRealizado);
            $scope.ordene.avance = Math.round(($scope.totalRealizado*100)/$scope.totalProg);
            console.log($scope.ordene.avance);
            if($scope.ordene.estado!="Finalizado" && $scope.finalizado == $scope.sub) {
                if($scope.globalRoles(['admin','Gerente','Produccion'])){
                    $scope.finalizable = true;
                }else{
                    $scope.finalizable = false;
                }

            }else{
                $scope.finalizable = false;
            }
            if($scope.ordene.estado=="Finalizado" && $scope.entregado == $scope.ordene.productosOrden.length) {
                if($scope.globalRoles(['admin','Gerente','Recepcionista'])){
                    $scope.entregable = true;
                }else{
                    $scope.entregable = false;
                }

            }else{
                $scope.entregable = false;
            }
            if($scope.ordene.estado == "pendiente" ){
                if($scope.progreso){
                    $scope.ordene.estado="En Progreso";
                }

            }

        });
    });