'use strict'

Meteor.publish('facturas', function() {
  return Facturas.find({});
});
Meteor.methods({
  img: function (id) {
    return Uploads.findOne({_id:id});
  },

});