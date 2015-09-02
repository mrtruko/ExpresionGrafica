'use strict';

angular.module('graficaExpresionApp')
.directive('chat', function() {
  return {
    restrict: 'EA',
    templateUrl: 'client/components/chat/chat.view.ng.html',
    replace: true,
    link: function(scope, elem, attrs) {
      scope.property = 'chat';
    }
  };
});