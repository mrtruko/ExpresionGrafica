'use strict'

angular.module('graficaExpresionApp')
.config(function($stateProvider) {
  $stateProvider
  .state('proveedores', {
    url: '/proveedores',
    templateUrl: 'client/proveedores/views/proveedores.view.ng.html',
    controller: 'ProveedoresCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  }).state('proveedor', {
        url: '/proveedor',
        templateUrl: 'client/proveedores/views/proveedor-create.view.ng.html',
        controller: 'ProveedorCtrl',
        resolve: {
          currentUser: ['$meteor', function($meteor) {
            return $meteor.requireUser();
          }]
        }
      }).state('editProveedor', {
          url: '/proveedor/:idProveedor',
          templateUrl: 'client/proveedores/views/proveedor-create.view.ng.html',
          controller: 'ProveedorEditCtrl',
          resolve: {
              currentUser: ['$meteor', function($meteor) {
                  return $meteor.requireUser();
              }]
          }
      })
      .state('factura', {
          url: '/factura',
          templateUrl: 'client/proveedores/views/proveedor-factura.view.ng.html',
          controller: 'ProveedorFacturaCtrl',
          controllerAs:'facturaEdita',
          resolve: {
              currentUser: ['$meteor', function($meteor) {
                  return $meteor.requireUser();
              }],
              "data": ["$meteor", function($meteor){
                  return $meteor.subscribe('facturas');
              }]
          }
      });
});
