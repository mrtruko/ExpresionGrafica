'use strict'

angular.module('graficaExpresionApp')
.controller('EmpresasCtrl', function($scope, $meteor) {
      $scope.empresas = $scope.$meteorCollection(Empresas).subscribe("empresas");
          $scope.eliminarEmpresa = function(id){
                $scope.empresa = $meteor.object(Empresas, id,false).subscribe("Empresas");
                console.log($scope.empresa);
                bootbox.dialog({
                          title: "Desea Eliminar A"+ $scope.empresa.nombreEmpresa,
                          message: "Eliminando",
                          buttons: {
                                success: {
                                      label: "Eliminar",
                                      className: "btn-error",
                                      callback: function () {
                                            $scope.empresas.remove($scope.empresa);
                                      }
                                }
                          }
                    }
                );
          }
        $scope.contactoSelec = function(contacto){

            $scope.contactoSeleccionado = contacto;
            console.log($scope.contactoSeleccionado);
        }
        $scope.handleSliderNav = function (empresa) {
            $scope.empresa = empresa;
            console.log(empresa);
            var contact_card = $('#contact-card');
            $('#contact-card').show();
            $scope.filtro = empresa._id;
            $('#contact-card .panel-title').html(empresa.nombreEmpresa);
            $('#contact-card #card-name').html(empresa.nombreEmpresa);
            $('#contact-card #card-rutEmpresa').html(empresa.rutEmpresa);
            $('#contact-card #card-direccionEmpresa').html(empresa.direccionEmpresa);
            $('#contact-card #card-giro').html(empresa.giro);
            $('#contact-card #card-ciudadEmpresa').html(empresa.ciudadEmpresa);
            $('#contact-card #card-rut').html(empresa.rutEmpresa);
            $('#contact-card #card-fono').html(empresa.fonoEmpresa);
            $('#contact-card #card-mailempresa').html(empresa.mailempresa);


            contact_card.removeClass('animated fadeInUp').addClass('animated fadeInUp');
            var wait = window.setTimeout( function(){
                    contact_card.removeClass('animated fadeInUp')},
                1300
            );

        }
});