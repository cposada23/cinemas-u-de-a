'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarteleraSchema = new Schema({
    cineId: String,
    fechaInicio:{type:Date , default:Date.now},
    fechaFin: {type:Date, default:Date.now},
    peliculas:[{
        idPelicula: String,
        nombrePelicula: String,
        lenguaje: String,
        imagen: String
    }]
});


module.exports = mongoose.model('carteleras' , CarteleraSchema);    