'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var salas= require('../sala/sala.modelo');

var SillaSchema = new Schema({
   fila:String,
   numero: Number,
   sala:{type: Schema.Types.ObjectId , ref:'salas'},
   localidad:{type:String, default:"general"}
});


module.exports = mongoose.model('sillas' , SillaSchema);    