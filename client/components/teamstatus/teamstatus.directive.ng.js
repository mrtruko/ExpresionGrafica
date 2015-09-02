'use strict';

angular.module('graficaExpresionApp')
.directive('teamstatus', function() {
  return {
    restrict: 'EA',
    templateUrl: 'client/components/teamstatus/teamstatus.view.ng.html',
    replace: true,
    link: function(scope, elem, attrs) {
      scope.property = 'teamstatus';
    }
  };
});