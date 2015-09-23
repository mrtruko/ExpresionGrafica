Empresas = new Mongo.Collection('empresas');

Empresas.allow({
  insert: function(userId, empresa) {
    return true;
  },
  update: function(userId, empresa, fields, modifier) {
    return true;
  },
  remove: function(userId, empresa) {
    return true;
  }
});
Schema = {};
Schema.Empresa = new SimpleSchema({
  rutEmpresa: {
    type: String,
  },
  nombreEmpresa: {
    type: String,
  },
  direccionEmpresa: {
    type: String,
  },
  giro: {
    type: String,
  },
  ciudadEmpresa: {
    type: String,
  },
  fonoEmpresa:{
    type: String,
  },
  mailempresa: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  contactos:{
    type: Array,
  },
  "contactos.$": {
    type: Object
  },
  "contactos.$.rut": {
    type: String
  },
  "contactos.$.nombre": {
    type: String
  },
  "contactos.$.apellido": {
    type: String
  },
  "contactos.$.email": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "contactos.$.fono": {
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
        this.unset();
      }
    }
  },
  user: {
    type: String,
    autoValue:function(){ return this.userId }
  }
});
Empresas.attachSchema(Schema.Empresa);