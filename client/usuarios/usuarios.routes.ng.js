'use strict'

angular.module('graficaExpresionApp')
.config(function($stateProvider) {
  $stateProvider
  .state('usuarios', {
      url: '/usuarios',
      templateUrl: 'client/usuarios/views/usuarios.view.ng.html',
      controller: 'UsuariosCtrl',
      resolve: {
        currentUser: ['$meteor', function($meteor) {
          return $meteor.requireUser();
        }]
      }
    }).state('createUsuarios', {
        url: '/usuarios/create',
        templateUrl: 'client/usuarios/views/create-usuario.view.ng.html',
        controller: 'UsuariosCtrl',
        resolve: {
          currentUser: ['$meteor', function($meteor) {
            return $meteor.requireUser();
          }]
        }
      }).state('editUsuarios', {
          url: '/usuarios/:usuarioId',
          templateUrl: 'client/usuarios/views/edit-usuario.view.ng.html',
          controller: 'EditarUsuarioCtrl',
          resolve: {
              currentUser: ['$meteor', function($meteor) {
                  return $meteor.requireUser();
              }]
          }
      }).state('perfil', {
          url: '/perfil',
          templateUrl: 'client/usuarios/views/perfil-usuario.view.ng.html',
          controller: 'PerfilUsuariosCtrl',
          resolve: {
              currentUser: ['$meteor', function($meteor) {
                  return $meteor.requireUser();
              }]
          }
      });
});