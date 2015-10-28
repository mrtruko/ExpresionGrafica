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
}).directive('schrollBottom', function () {
      return {
        scope: {
          schrollBottom: "="
        },
        link: function (scope, element) {
          scope.$watchCollection('schrollBottom', function (newValue) {
            if (newValue)
            {
              $(element).scrollTop($(element)[0].scrollHeight);
            }
          });
        }
      }
    });