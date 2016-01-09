var sillas = require('./silla.modelo');

/**
 * Obtener salas, solo lo utilizo para saber ---
 */

exports.sillas = function (req,res) {
    
    sillas.find({},function (err, sillas) {
        if(err)return handleError(res, err);
        res.status(200).json(sillas);
    });
};



function handleError(res, err) {
    return res.status(500).send(err);
};

