'use strict'

Meteor.publish('chats', function() {return Chats.find({});
});
