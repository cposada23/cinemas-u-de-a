var cinemas = require('./cinema.modelo');

/**
 * Obtener la lista de cinemas
 */
exports.listar = function (req,res) {
    
    
    /*cinema.find({}).remove(function () {
        console.log("borrados");
    })*/
    cinemas.find({} ,function (err,cines) {
        if (err){return handleError(res,err);}
        return res.status(200).json(cines);
        
    });
};


function handleError(res, err) {
    return res.send(500, err);
};