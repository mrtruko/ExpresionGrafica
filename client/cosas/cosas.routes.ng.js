'use strict'

angular.module('graficaExpresionApp')
.config(function($stateProvider) {
  $stateProvider
  .state('cosas-list', {
    url: '/cosas',
    templateUrl: 'client/cosas/cosas-list.view.ng.html',
    controller: 'CosasListCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  })
  .state('cosa-detail', {
    url: '/cosas/:cosaId',
    templateUrl: 'client/cosas/cosa-detail.view.ng.html',
    controller: 'CosaDetailCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  });
});