'use strict'

Meteor.publish('cotizacion', function() {
  return Cotizacion.find({});
});
