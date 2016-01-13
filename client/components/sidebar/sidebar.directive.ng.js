'use strict'

angular.module('graficaExpresionApp')
.directive('sidebar', function() {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/sidebar/sidebar.view.ng.html',
    replace: true
  };
}).directive('ngEnter', function() {
      return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
          if(event.which === 13) {
            scope.$apply(function(){
              scope.$eval(attrs.ngEnter);
            });

            event.preventDefault();
          }
        });
      };
    }).controller('buscadorCtrl', function($scope, $location) {
      $scope.$meteorSubscribe('ordenes');
      $scope.buscar = function(buscador){
        console.log(1);
        $scope.resultado=null;
        Meteor.call('idOrden', buscador,
            function(error,result){
              if(result){
                $scope.resultado = result._id;
                $scope.rediccion(result._id);
                $scope.buscador = "";
                $scope.$apply();

              }else{
                  $scope.msgAlerta("No Encontrado","error")
              }
            });



      }
      $scope.rediccion = function(id){
        $location.path('orden/' + id);
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