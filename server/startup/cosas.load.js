Meteor.startup(function() {
  if(Cosas.find().count() === 0) {
    var cosas = [
      {
        'name': 'cosa 1'
      },
      {
        'name': 'cosa 2'
      }
    ];
    cosas.forEach(function(cosa) {
      Cosas.insert(cosa);
    });
  }
});