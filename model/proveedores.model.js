Facturas = new Mongo.Collection('facturas');

Facturas.allow({
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
Schema.Factura = new SimpleSchema({
  idEmpresa: {
    type: String,
  },
  numeroFactura: {
    type: String
  },
  fecha: {
    type: Date
  },
  monto: {
    type: Number
  },
  factura: {
    type: String
  },
  estado: {
    type: String
  },
  tipoPago: {
    type: String,
    optional: true
  },
  fechaPago: {
    type: Date,
    optional: true
  },
  cheque: {
    type: String,
    optional: true
  },
  banco: {
    type: String,
    optional: true
  },
  archivoComprobante: {
    type: String,
    optional: true
  },
  detalle: {
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
Facturas.attachSchema(Schema.Factura);