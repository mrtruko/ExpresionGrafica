'use strict'

Meteor.publish('facturas', function() {
  return Facturas.find({});
});
