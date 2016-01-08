'use strict';
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var PeliculaSchema = new Schema({
    nombre: String,
    formato: String,
    descripcion:String,
    lenguaje: String,
    genero: String,
    trailer: String,
    imagen: String,
    pais:String,
    director: String,
    reparto:[{
        nombre: String
    }],
    censura: String,
    comentarios:[{
        texto: String,
        fecha: {type:Date , default: Date.now},
        autor: String
    }]
});

module.exports = mongoose.model('peliculas', PeliculaSchema);
