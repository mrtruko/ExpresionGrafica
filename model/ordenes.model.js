Ordenes = new Mongo.Collection('ordenes');

Ordenes.allow({
  insert: function(userId, ordene) {
    return true;
  },
  update: function(userId, ordene, fields, modifier) {
    return true;
  },
  remove: function(userId, ordene) {
    return true;
  }
});