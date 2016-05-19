Meteor.publish("users",function(){
    return Meteor.users.find({},{fields:{emails:1,profile:1,username:1,roles:1}})
})
Schema = {};

Schema.UserProfile = new SimpleSchema({
    nombre: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/
    },
    apellido: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/
    },
    direccion: {
        type: String,
    },
    telefono: {
        type: String,
    },
    rut: {
        type: String,
    },
    displayName: {
        type: String,
    },
    imgPerfil: {
        type: String,
        optional: true
    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
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
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        blackbox: true
    },
    roles: {
        type: [String],
        optional: true
    }
});
Schema.User.messages({required: "[label] es requerido"});
Meteor.users.attachSchema(Schema.User);
Meteor.methods({
    'insertUser': function(usuario){
        return Accounts.createUser(usuario);
    },'roles': function(id){
        //console.log(id);
        Roles.addUsersToRoles(id, ['inactivo']);
    },'validarStock':function(id,cantidad){
        var resultado = Productos.findOne({_id:id,cantidad: { $gte:cantidad }});
        console.log(resultado);
        return resultado;
    },'setPass': function(usuario){
        //console.log(usuario.pass+"_Pass");
        //console.log(usuario);
        Accounts.setPassword(usuario.id, usuario.pass);
    },'sms': function(msg){
        twilio = Twilio("ACc45a719d49a4ec30afa9af9b7fe8bcb2", "a082498ec88c8e9a971e9890dec49b42");
        twilio.sendSms({
            to:'+56962374910', // Any number Twilio can deliver to
            from: '+16468464197', // A number you bought from Twilio and can use for outbound communication
            body: 'se creo una cuenta con tu numero de telefono en GraficaExpresion.' // body of the SMS message
        }, function(err, responseData) { //this function is executed when a response is received from Twilio
            if (!err) { // "err" is an error received during the request, if any
                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1
                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."
            }else{
                console.log("no enviado");
                console.log(responseData)
            }
        });
    },'idOrden': function(id){
        return Ordenes.findOne({idOrden: parseInt(id)});
    }

});
Accounts.validateLoginAttempt(function(attempt) {
    if(attempt.user!= undefined){
        //if(Roles.userIsInRole(attempt.user._id, ['inactivo'])) { attempt.allowed = false; throw new Meteor.Error(403, "Error al Ingresar!"); }
    }
     return true;

});
//Accounts.validateLoginAttempt(function(attempt){
//    if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
//        console.log('Verificar email');
//
//        return false;
//   }
//    return true;
//});