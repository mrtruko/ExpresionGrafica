Meteor.onConnection(function (connection) {
    // Check if connected client has their IP banned
    //console.log(connection.clientAddress);
    //if (BannedIPs.findOne({IP: connection.clientAddress})) {
        // Close/deny connection
        //connection.close();
    //}
})