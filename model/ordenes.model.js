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
  _id: {
    type: String,
    optional: true
  },
  avance: {
    type: Number,
    optional: true
  },
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
    type: Number
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
  documento: {
    type: String,
    optional: true
  },
  banco: {
    type: String,
    optional: true
  },
  saldo: {
    type: Number
  },
  colaboradores:{
    type: Array,
    optional: true
  },
  "colaboradores.$": {
    type: Object
  },
  "colaboradores.$.id": {
    type: String
  },
  "colaboradores.$.url": {
    type: String
  },
  productosOrden:{
    type: Array,
    optional: true
  },
  estado:{
    type: String
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
  "productosOrden.$.tipo": {
    type: String
  },
  "productosOrden.$.estado": {
    type: String,
    optional: true
  },
  "productosOrden.$.medida": {
    type: String,
    optional: true
  },
"productosOrden.$.nombreProducto": {
    type: String
  },
  "productosOrden.$.cantidad": {
    type: Number
  },
  "productosOrden.$.realizados": {
    type: Number,
    optional: true
  },
  "productosOrden.$.entregados": {
    type: Number,
    optional: true
  },
  "productosOrden.$.precioVenta": {
    type: Number
  },
"productosOrden.$.precioTotal": {
  type: Number
},
  "productosOrden.$.precioAgencia": {
    type: Number,
    optional: true
  },
  "productosOrden.$.precioComercial": {
    type: Number,
    optional: true
  },
"productosOrden.$.cantidadP": {
  type: Number,
  optional: true
},
  "productosOrden.$.comentario": {
    type: String,
    optional: true
  },
  "productosOrden.$.url": {
    type: [String],
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
  },
  idOrden:{
    type: Number,
    autoValue:function(){
      if (this.isInsert) {
        if(Ordenes.findOne({},{sort:{idOrden:-1}})){
          return Ordenes.findOne({},{sort:{idOrden:-1}}).idOrden+1 || 1;
        }else{
          return 1;
        }
      }


    }
  }
});
Ordenes.attachSchema(Schema.Orden);