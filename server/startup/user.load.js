Meteor.startup(function() {

    if(Meteor.users.find().count() === 9) {
     Accounts.createUser({ email: 'nico11@gmail.com',username: 'mrtruko1',password: '123456',roles : ["admin"],profile: { nombre: 'nicolas',apellido: 'gonzalez',telefono: '12352',direccion: 'nivover',rut: '01291201',displayName: 'nicolas gonzalez' } });
        console.log("Inicio Usuarios")
    }
});

