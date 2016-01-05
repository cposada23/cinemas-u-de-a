//aplicacion principal servidor en node
//configuración 
var config = require('./config/environment');

//Dependencias
var express = require('express');
var mongoose = require('mongoose');

//Conexión a la base de datos
mongoose.connect(config.mongo.uri, config.mongo.options);

//servidor
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip,function () {
    console.log('Servidor express escuchando en el puerto ' + config.port + ' con IP: ' +  config.ip  );
});

exports = module.exports = app;