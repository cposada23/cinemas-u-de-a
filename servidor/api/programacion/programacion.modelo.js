var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProgramacionSchmea = new Schema({
    fechaInicio : {type: Date, default: Date.now},
    fechaFin: {type: Date , default:Date.now},
    sala:{type :Schema.Types.ObjectId, ref:'salas'},
    funciones:[{type: Schema.Types.ObjectId, ref:'funciones'}]
});

module.exports = mongoose.model('programaciones' , ProgramacionSchmea);