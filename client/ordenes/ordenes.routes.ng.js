'use strict'

angular.module('graficaExpresionApp')
.config(function($stateProvider) {
  $stateProvider
  .state('ordenes', {
    url: '/ordenes',
    templateUrl: 'client/ordenes/views/ordenes.view.ng.html',
    controller: 'OrdenesCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  }).state('Createorden', {
        url: '/orden',
        templateUrl: 'client/ordenes/views/create-orden.view.ng.html',
        controller: 'CreateOrdenCtrl',
        resolve: {
          currentUser: ['$meteor', function($meteor) {
            return $meteor.requireUser();
          }]
        }
      });
});