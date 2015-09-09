'use strict'

Meteor.publish('productos', function() {return Productos.find()});

