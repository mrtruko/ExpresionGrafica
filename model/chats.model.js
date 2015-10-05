Chats = new Mongo.Collection('chats');
Chats.allow({
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
Schema.Chat = new SimpleSchema({
    msg: {
        type: String
    },
    nombre:{
        type:String
    },
    imgPerfil:{
        type:String
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
Chats.attachSchema(Schema.Chat);