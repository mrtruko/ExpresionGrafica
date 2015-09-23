'use strict'

angular.module('graficaExpresionApp')
.controller('ClientesCtrl', function($scope, $meteor) {
      $scope.clientes = $scope.$meteorCollection(Clientes).subscribe("clientes");

          $scope.eliminarCliente = function(id){
                $scope.cliente = $meteor.object(Clientes, id,false).subscribe("clientes");
                console.log($scope.cliente);
                bootbox.dialog({
                          title: "Desea Eliminar A"+ $scope.cliente.nombreCliente,
                          message: "Eliminando",
                          buttons: {
                                success: {
                                      label: "Eliminar",
                                      className: "btn-error",
                                      callback: function () {
                                            $scope.clientes.remove($scope.cliente);
                                      }
                                }
                          }
                    }
                );
          }
          $scope.handleSliderNav = function (cliente) {
                var contact_card = $('#contact-card');
                $('#contact-card').show();
                $scope.filtro = cliente._id;
                $('#contact-card .panel-title').html(cliente.nombreCliente);
                $('#contact-card #card-name').html(cliente.nombreCliente);
                $('#contact-card #card-rut').html(cliente.rut);
                $('#contact-card #card-apellidoCliente').html(cliente.apellidoCliente);
                $('#contact-card #card-email').html(cliente.email);
                $('#contact-card #card-fono').html(cliente.fono);
                $('#contact-card #card-direccion').html(cliente.direccion);
                contact_card.removeClass('animated fadeInUp').addClass('animated fadeInUp');
                var wait = window.setTimeout( function(){
                          contact_card.removeClass('animated fadeInUp')},
                    1300
                );

          }
});