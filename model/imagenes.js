Imagenes = new FS.Collection("Imagenes", {
    stores: [
        new FS.Store.GridFS("original")
    ],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

if (Meteor.isServer) {
    Imagenes.allow({
        insert: function (userId) {
            return true;
        },
        remove: function (userId) {
            return true;
        },
        download: function () {
            return true;
        },
        update: function (userId) {
            return true;
        }
    });

    Meteor.publish('imagenes', function() {
        return Imagenes.find({});
    });
}