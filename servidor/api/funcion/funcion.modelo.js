var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FuncionSchema = new Schema({
    fecha:{type:Date, default:Date.now},
    hora:String,
    programacion: {type: Schema.Types.ObjectId, ref:'programaciones'},
    pelicula: {type: Schema.Types.ObjectId, ref:'peliculas'},
    boletas:[{type: Schema.Types.ObjectId, ref:'boletas'}]
});

module.exports = mongoose.model('funciones', FuncionSchema);