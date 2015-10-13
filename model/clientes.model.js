Clientes = new Mongo.Collection('clientes');
Clientes.allow({
  insert: function(userId, cliente) {
    return true;
  },
  update: function(userId, cliente, fields, modifier) {
    return true;
  },
  remove: function(userId, cliente) {
    return true;
  }
});
Schema = {};
Schema.Cliente = new SimpleSchema({
  rut: {
    type: String,
  },
  nombreCliente: {
    type: String,
  },
  apellidoCliente: {
    type: String,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  fono: {
    type: String,
  },
  direccion: {
    type: String,
  },
  vip: {
    type: Boolean,
    optional: true
  },
  agencia: {
    type: Boolean,
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
Clientes.attachSchema(Schema.Cliente);