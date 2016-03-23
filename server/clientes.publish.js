'use strict'

Meteor.publish('clientes', function() {
    return Clientes.find({});
});
Meteor.publish('clientesAgendaList', function() {
    return Clientes.find({});
});
