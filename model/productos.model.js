Productos = new Mongo.Collection('productos');

Productos.allow({
  insert: function(userId, producto) {
    return true;
  },
  update: function(userId, producto, fields, modifier) {
    return true;
  },
  remove: function(userId, producto) {
    return true;
  }
});
Schema = {};

Schema.Producto = new SimpleSchema({
  nombreProducto: {
    type: String
  },
  apellido: {
    type: String
  },
  precioComercial: {
    type: String
  },
  precioAgencia: {
    type: String
  },
  cantidad: {
    type: String
  },
  tipo: {
    type: String
  },
  comerciable: {
    type: Boolean
  },
  estado: {
    type: String
  },
  descripcion: {
    type: String
  },
  created: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  user: {
    type: String,
    autoValue:function(){ return this.userId }
  },
  movimientos:{
    type: [Object],
  }
});
Productos.attachSchema(Schema.Producto);
