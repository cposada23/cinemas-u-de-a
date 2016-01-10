'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CinemaSchema = new Schema({
    nombre: String,
    direccion:String,
    municipio:String,
    cartelera:String,
    programacionActual: [{type: Schema.Types.ObjectId, ref:'programaciones'}]
});


module.exports = mongoose.model('cinemas' , CinemaSchema);    