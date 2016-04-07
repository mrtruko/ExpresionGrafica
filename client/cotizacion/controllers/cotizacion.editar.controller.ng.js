'use strict'

angular.module('graficaExpresionApp')
    .controller('CotizacionEditCtrl', function($scope, $reactive,$stateParams) {
        $reactive(this).attach($scope);
        this.subscribe('cotizacion');

        this.helpers({
                    cot: () => Cotizacion.findOne({_id:$stateParams.idCotizacion}),
        });


    });