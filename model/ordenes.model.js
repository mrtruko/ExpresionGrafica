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

Schema = {};
Schema.Orden = new SimpleSchema({
  cliente: {
    type: String,
    optional: true
  },
  empresa: {
    type: String,
    optional: true
  },
  contactoEmpresa: {
    type: String,
    optional: true
  },
  created: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  },
  user: {
    type: String,
    autoValue:function(){ return this.userId }
  }
});
Ordenes.attachSchema(Schema.Orden);