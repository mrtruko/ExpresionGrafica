'use strict'

Meteor.publish('productos', function(options, searchString) {
  if(!searchString) {
    searchString = '';
  }
  Counts.publish(this, 'numberOfProductos', Productos.find({
    'nombreProducto': {
      '$regex': '.*' + searchString || '' + '.*',
      '$options': 'i'
    }
  }), {noReady: true});
  return Productos.find({
    'nombreProducto': {
      '$regex': '.*' + searchString || '' + '.*',
      '$options': 'i'
    }
  }, options);
});

