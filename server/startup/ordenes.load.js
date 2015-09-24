Meteor.startup(function() {
  if(Ordenes.find().count() === 0) {
    var ordenes = [
      {
        'name': 'ordene 1'
      },
      {
        'name': 'ordene 2'
      }
    ];
    ordenes.forEach(function(ordene) {
      Ordenes.insert(ordene);
    });
  }
});