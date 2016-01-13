'use strict'

Meteor.publish('ordenes', function() {return Ordenes.find({}, {sort: {idOrden:1}});
});