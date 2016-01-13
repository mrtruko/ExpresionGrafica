'use strict'

Meteor.publish('chats', function() {
    return Chats.find({}, {sort: {created:1}});
});
