'use strict';


var funciones = require('../funcion/funcion.modelo');



/**
 * Obtener una pelicula por su id con sus respectivas boletas
 */

exports.funcion= function (req,res) {
    
    
    funciones.findOne({_id :req.params.id}).populate('boletas').exec(function (err, funcion) {
        if(err) return handleError(res, err);
        return res.status(200).json(funcion);
    });
};


function handleError(res, err) {
    return res.send(500, err);
};
