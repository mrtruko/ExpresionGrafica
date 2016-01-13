'use strict'

Meteor.publish('cosas', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfCosas', Cosas.find(where), {noReady: true});
  return Cosas.find(where, options);
});
