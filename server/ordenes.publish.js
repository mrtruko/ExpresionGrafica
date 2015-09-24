'use strict'

Meteor.publish('ordenes', function() {return Ordenes.find({});
});