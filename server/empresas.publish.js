'use strict'

Meteor.publish('empresas', function() {return Empresas.find({});
});
