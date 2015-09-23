'use strict'

angular.module('graficaExpresionApp')
.config(function($stateProvider) {
  $stateProvider
  .state('clientes', {
    url: '/clientes',
    templateUrl: 'client/clientes/views/clientes-list.view.ng.html',
    controller: 'ClientesCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  }).state('cliente', {
        url: '/cliente',
        templateUrl: 'client/clientes/views/cliente-create.view.ng.html',
        controller: 'ClientesCreateCtrl',
        resolve: {
          currentUser: ['$meteor', function($meteor) {
            return $meteor.requireUser();
          }]
        }
      }).state('cliente-edit', {
          url: '/clientes/:clienteId',
          templateUrl: 'client/clientes/views/cliente-edit.view.ng.html',
          controller: 'ClienteEditCtrl',
          resolve: {
              currentUser: ['$meteor', function($meteor) {
                  return $meteor.requireUser();
              }]
          }
      }).state('agenda-cliente', {
              url: '/agendac',
              templateUrl: 'client/clientes/views/agenda-cliente.view.ng.html',
              controller: 'ClientesCtrl',
              resolve: {
                  currentUser: ['$meteor', function($meteor) {
                      return $meteor.requireUser();
                  }]
              }
          });
});