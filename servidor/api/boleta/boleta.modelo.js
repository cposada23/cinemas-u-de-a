var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoletaSchema = new Schema({
    usuario:String,
    reserva:Boolean,
    qr: String,
    sillaReservada: Boolean,
    silla:{type: Schema.Types.ObjectId, ref:'sillas'},
    funcion: {type: Schema.Types.ObjectId, ref:'funciones'},
    precio: {type: Schema.Types.ObjectId, ref:'precios'},
    fecha: {type:Date , default:Date.now}
});

module.exports = mongoose.model('boletas', BoletaSchema);