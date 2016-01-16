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

exports.silla = function (req,res) {
    sillas.find({_id: req.params.id}, function(err, silla) {
        return res.status(200).json(silla);  
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
};

