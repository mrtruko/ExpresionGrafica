Proveedores = new Mongo.Collection('proveedores');

Proveedores.allow({
  insert: function(userId, proveedore) {
    return userId;
  },
  update: function(userId, proveedore, fields, modifier) {
    return userId;
  },
  remove: function(userId, proveedore) {
    return userId;
  }
});
Schema = {};
Schema.Proveedor = new SimpleSchema({
  rut: {
    type: String,
  },
  nombre: {
    type: String,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  telefono: {
    type: String,
  },
    razonSocial: {
    type: String,
  },
  sede: {
    type: String,
  },
  paginaWeb: {
    type: String,
    optional: true
  },
  facturas:{
    type: Array,
    optional: true
  },
  "facturas.$": {
    type: Object
  },
  "facturas.$.numeroFactura": {
    type: String
  },
  "facturas.$.fecha": {
    type: String
  },
  "facturas.$.monto": {
    type: Number
  },
  "facturas.$.factura": {
    type: String
  },
  "facturas.$.estado": {
    type: String
  },
  "facturas.$.formaPago": {
    type: String,
    optional: true
  },
  "facturas.$.fechaPago": {
    type: String,
    optional: true
  },
  "facturas.$.cheque": {
    type: String,
    optional: true
  },
  "facturas.$.banco": {
    type: String,
    optional: true
  },

  "facturas.$.archivoComprobanteUrl": {
    type: String,
    optional: true
  },
  "facturas.$.detalle": {
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
Proveedores.attachSchema(Schema.Proveedor);