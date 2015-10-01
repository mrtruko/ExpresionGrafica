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
  observacion: {
    type: String,
    optional: true
  },
  responsable: {
    type: String,
    optional: true
  },
  mostrarCliente: {
    type: Boolean,
    optional: true
  },
  fecha: {
    type: String,
    optional: true
  },
  fechaCompromiso: {
    type: String,
    optional: true
  },
  abono: {
    type: Number,
    optional: true
  },
  iva: {
    type: Number,
    optional: true
  },
  total: {
    type: Number,
    optional: true
  },
  neto: {
    type: Number,
    optional: true
  },
  hora: {
    type: String,
    optional: true
  },
  saldo: {
    type: Number,
    optional: true
  },
  productosOrden:{
    type: Array,
    optional: true
  },
  "productosOrden.$": {
    type: Object
  },
  "productosOrden.$.id": {
    type: String
  },
  "productosOrden.$.codigo": {
    type: String
  },
"productosOrden.$.nombreProducto": {
    type: String
  },
  "productosOrden.$.cantidad": {
    type: Number
  },
  "productosOrden.$.precioComercial": {
    type: Number
  },
"productosOrden.$.precioAgencia": {
  type: Number
},
"productosOrden.$.cantidadP": {
  type: Number
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
  },
  idOrden:{
    type: Number,
    autoValue:function(){
      if(Ordenes.findOne({},{sort:{idOrden:-1}})){
        return Ordenes.findOne({},{sort:{idOrden:-1}}).idOrden+1 || 1;
      }else{
        return 1;
      }

    }
  }
});
Ordenes.attachSchema(Schema.Orden);