'use strict'

angular.module('graficaExpresionApp')
.controller('OrdenesCtrl', function($scope, $rootScope) {
      $scope.ordenes = $scope.$meteorCollection(Ordenes).subscribe("ordenes");
        $scope.producSelec = {}
        $scope.colaborador = {'id':$rootScope.currentUser._id,'url':$rootScope.currentUser.profile.imgPerfil};

        console.log($rootScope.currentUser);

          $scope.alerta3 = function(ordene){
              $scope.ordene = $scope.$meteorObject(Ordenes, ordene.id);

                $scope.ordene = ordene;
                $scope.mostrar = true;
              $scope.colaborando = false;


              //var found = $.inArray($rootScope.currentUser._id, ) > -1;
              angular.forEach($scope.ordene.colaboradores, function(valuePro, keyPro) {
                  if(valuePro.id===$rootScope.currentUser._id){
                      $scope.colaborando = true;
                  }else{
                      console.log(valuePro);
                      console.log(keyPro);
                  }


              });

              console.log($scope.ordene);
          }
        $scope.pSelecionado = function(producto){
            console.log(producto);
            $scope.producSelec = producto;
            console.log(producto);
        };
        $scope.terminada = function(){
            $scope.ordene.estado = "Finalizada";
        }
        $scope.colaborar = function(){
            if(!$scope.ordene.colaboradores){
                $scope.ordene.colaboradores = [];
            }else{
                console.log($scope.ordene.colaboradores);
            }
            console.log($scope.ordene._id);
            console.log($scope.colaborador);
            $scope.colaborando = true;
            console.log( Ordenes.update({_id:$scope.ordene._id},{$push: {colaboradores:  $scope.colaborador}}));
            $scope.$apply();



        }
});