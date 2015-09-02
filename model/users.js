Meteor.users.allow({
    update: function(userId, user){
        return true;
    },
    insert: function(userId, user){ return true;},
    remove: function(userId, thing) {
        return true;
    }
});