'use strict'

angular.module('graficaExpresionApp')
.config(function($stateProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'client/login/login.view.ng.html',
    controller: 'LoginCtrl',
    controllerAs: 'lc'
  }).state('logout', {
          url: '/logout',
          resolve: {
              "logout": ['$meteor', '$state', function($meteor, $state) {
                  return $meteor.logout().then(function(){
                      $state.go('login');
                  }, function(err){
                      console.log('logout error - ', err);
                  });
              }]
          }
      });
});