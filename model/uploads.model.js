Uploads = new FS.Collection("uploads", {
    stores: [
        //new FS.Store.FileSystem('uploads',{path:'~/archivos'})
        new FS.Store.FileSystem('uploads',{path:'/opt/cfs/images/original'})
    ]
});

if (Meteor.isServer) {
    Uploads.allow({
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

}