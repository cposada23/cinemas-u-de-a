var programaciones = require('./programacion.modelo');


/**
 * Obtener salas, solo lo utilizo para saber ---
 */

exports.programacion = function (req,res) {
    
    programaciones.findOne({_id: req.params.id}).populate('funciones').exec(function (err, programacion) {
        if (err)return handleError(res, err);
        res.status(200).json(programacion);
    });
};





function handleError(res, err) {
    return res.status(500).send(err);
};

