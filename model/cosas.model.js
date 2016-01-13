Cosas = new Mongo.Collection('cosas');

Cosas.allow({
  insert: function(userId, cosa) {
    return userId;
  },
  update: function(userId, cosa, fields, modifier) {
    return userId;
  },
  remove: function(userId, cosa) {
    return userId;
  }
});