'use strict'

angular.module('graficaExpresionApp')
.config(function($stateProvider) {
  $stateProvider
  .state('empresas', {
    url: '/empresas',
    templateUrl: 'client/empresas/views/empresas.view.ng.html',
    controller: 'EmpresasCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  }).state('empresasCreate', {
        url: '/empresa',
        templateUrl: 'client/empresas/views/create-empresa.view.ng.html',
        controller: 'CreateEmpresasCtrl',
        resolve: {
          currentUser: ['$meteor', function($meteor) {
            return $meteor.requireUser();
          }]
        }
      }).state('empresa-edit', {
          url: '/empresas/:empresaId',
          templateUrl: 'client/empresas/views/create-empresa.view.ng.html',
          controller: 'EditEmpresasCtrl',
          resolve: {
              currentUser: ['$meteor', function($meteor) {
                  return $meteor.requireUser();
              }]
          }
      }).state('agenda-empresa', {
          url: '/agendae',
          templateUrl: 'client/empresas/views/agenda-empresa.view.ng.html',
          controller: 'EmpresasCtrl',
          resolve: {
              currentUser: ['$meteor', function($meteor) {
                  return $meteor.requireUser();
              }]
          }
      });
});