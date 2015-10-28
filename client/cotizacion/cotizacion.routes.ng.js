'use strict'

angular.module('graficaExpresionApp')
.config(function($stateProvider) {
  $stateProvider
  .state('cotizacion', {
    url: '/cotizacion',
    templateUrl: 'client/cotizacion/views/cotizacion.view.ng.html',
    controller: 'CotizacionCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  }).state('cotizacionrevisar', {
        url: '/cotizacion/:idCotizacion',
        templateUrl: 'client/cotizacion/views/cotizacion-revisar.view.ng.html',
        controller: 'CotizacionRevisarCtrl',
        resolve: {
          currentUser: ['$meteor', function($meteor) {
            return $meteor.requireUser();
          }]
        }
      });
});