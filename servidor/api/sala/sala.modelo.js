'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sillas = require('../silla/silla.modelo');

var SalaSchema = new Schema({
    numero:Number,
    cinema:String,
    programacion:String,
    sillas:[{type: Schema.Types.ObjectId, ref:'sillas'}]
    
});

module.exports = mongoose.model('salas' , SalaSchema);
