'use strict'

Meteor.publish('productos', function() {return Productos.find()});
Meteor.publish('productosOrden', function() {return Productos.find({ estado: "En Venta", comerciable: true })});
