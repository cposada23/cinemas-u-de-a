'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
    documento: String,
    tipoDoc: String,
    nombres: String,
    apellidos: String,
    correo: {type:String , lowercase: true},
    password: String, 
    telefono:{type:String , default:''},
    sexo:String,
    barrio:String,
    direccion:String,
    fechaNacimiento:{type:Date , default: Date.now},
    celular: {type:String , default:''},
    generoPelicula:String,
    tipo:{
        type:String,
        default:'usuario'
    },
    puntos: {type: Number, default: 0}
});


module.exports = mongoose.model('usuarios' , UserSchema);    

