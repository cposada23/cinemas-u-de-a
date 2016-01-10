var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PrecioSchema = new Schema({
    descripcion: String,
    localidad: String,
    formato:String,
    precioDinero: Number,
    precioPuntos:Number,
    puntosGanados: Number
});

module.exports = mongoose.model('precios', PrecioSchema);