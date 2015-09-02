'use strict';

angular.module('graficaExpresionApp')

.config(function($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}).run(['$rootScope', '$state', function($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
  console.log(error);
    switch(error) {
      case "AUTH_REQUIRED":
        $state.go('login');
        break;
      case "AUTH_NOT_REQUIRED":
        $state.go('dashboard');
        break;
      case "UNAUTHORIZED":
        $state.go('unauthorized');
        break;
      default:
        $state.go('dashboard');
    }
  });
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (toState.resolve) {
          console.log("Loading");
        }
      });
      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (toState.resolve) {
          console.log("Stopped");
        }
      });
      Accounts.onLogin(function () {
        if ($state.is('login')) {
          $state.go('main');
        }
      });

      Accounts.onLoginFailure(function () {
        $state.go('main');
      });
}]);