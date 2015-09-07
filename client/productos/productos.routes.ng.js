'use strict'

angular.module('graficaExpresionApp')
.config(function($stateProvider) {
  $stateProvider
  .state('productos-list', {
    url: '/productos',
    templateUrl: 'client/productos/views/productos-list.view.ng.html',
    controller: 'ProductosListCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  })
  .state('producto', {
        url: '/producto',
        templateUrl: 'client/productos/views/producto-create.view.ng.html',
        controller: 'ProductosCreateCtrl',
        resolve: {
          currentUser: ['$meteor', function($meteor) {
            return $meteor.requireUser();
          }]
        }
   })
  .state('producto-detail', {
    url: '/productos/:productoId',
    templateUrl: 'client/productos/views/producto-detail.view.ng.html',
    controller: 'ProductoDetailCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  })
  .state('producto-movimientos', {
        url: '/productos/:productoId/movimientos',
        templateUrl: 'client/productos/views/productos-movimientos.view.ng.html',
        controller: 'ProductoMovimientoCtrl',
        resolve: {
          currentUser: ['$meteor', function($meteor) {
            return $meteor.requireUser();
          }]
        }
   });
});