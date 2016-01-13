Meteor.startup(function() {
   //console.log("Inicio Usuarios")
    if(Meteor.users.find().count() === 0) {
     Accounts.createUser({ email: 'nico1@gmail.com',username: 'luis',password: '123456',roles : ["admin"],profile: { nombre: 'nicolas',apellido: 'gonzalez',telefono: '12352',direccion: 'nivover',rut: '01291201',displayName: 'nicolas gonzalez' } });
    }
});

