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
    },'setPass': function(usuario){
        //console.log(usuario.pass+"_Pass");
        //console.log(usuario);
        Accounts.setPassword(usuario.id, usuario.pass);
    }
});
Accounts.validateLoginAttempt(function(attempt) {
    if(attempt.user!= undefined){
        //if(Roles.userIsInRole(attempt.user._id, ['inactivo'])) { attempt.allowed = false; throw new Meteor.Error(403, "User account is inactive!"); }
    }
     return true;

});