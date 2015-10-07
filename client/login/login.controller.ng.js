'use strict'

angular.module('graficaExpresionApp')
.controller('LoginCtrl', function($scope,$rootScope,$meteor,$window,$state) {
  $scope.viewName = 'Login';
      if(Meteor.userId()){
          $state.go("main");
      }
      var vm = this;

      vm.credentials = {
        email: '',
        password: ''
      };
      $scope.error = '';

      vm.login = function () {
        $meteor.loginWithPassword(vm.credentials.email, vm.credentials.password).then(
            function () {
              $state.go('main');
            },
            function (err) {
                $scope.error = "Error Al Ingresar Intente Denuevo.";
            }
        );
      };
      $(".uniform").uniform();
      $('.backstretch').show();
      $.backstretch([
        "/img/login/1.jpg"
        , "/img/login/2.jpg"
        , "/img/login/3.jpg"
        , "/img/login/4.jpg"
      ], {duration: 3000, fade: 750});
});