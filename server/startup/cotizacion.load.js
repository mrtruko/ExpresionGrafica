Meteor.startup(function() {
  if(Cotizacion.find().count() === 0) {
    var cotizacion = [
      {
        'name': 'cotizacion 1'
      },
      {
        'name': 'cotizacion 2'
      }
    ];
    cotizacion.forEach(function(cotizacion) {
      Cotizacion.insert(cotizacion);
    });
  }
});