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
  codigo: {
    type: String
  },
  precioComercial: {
    type: Number
  },
  precioAgencia: {
    type: Number
  },
  cantidad: {
    type: Number
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
    type: Array,
    optional: true
  },
  "movimientos.$": {
    type: Object
  },
  "movimientos.$.motivo": {
    type: String
  },
  "movimientos.$.cantidad": {
    type: Number
  },
  "movimientos.$.responsable": {
    type: String
  },
  "movimientos.$.tipo": {
    type: String
  },
  "movimientos.$.fecha": {
    type: String
  },
});
Productos.attachSchema(Schema.Producto);
