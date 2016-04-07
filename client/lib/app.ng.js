angular.module('graficaExpresionApp', [
  'angular-meteor',
  'ui.router',
  'ui.bootstrap',
  'angularUtils.directives.dirPagination',
  'ngMaterial',
  'ngFileUpload',
  'ngImgCrop',
  'ui.bootstrap.typeahead'
]).config(['$angularMeteorSettings', function($angularMeteorSettings) {
  $angularMeteorSettings.suppressWarnings = true; // Disables write of warnings to console
}]);

onReady = function() {
  angular.bootstrap(document, ['graficaExpresionApp']);
};
  
if(Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}