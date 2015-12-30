'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CinemaSchema = new Schema({
    nombre: String,
    direccion:String,
    municipio:String,
    cartelera:String
});


module.exports = mongoose.model('cinemas' , CinemaSchema);    