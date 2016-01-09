var salas = require('./sala.modelo');
var sillas = require('../silla/silla.modelo');

/**
 * Obtener salas, solo lo utilizo para saber ---
 */

exports.salas = function (req,res) {
    
    salas.find().populate('sillas').exec(function (err, salas) {
        if (err)return handleError(res, err);
        res.status(200).json(salas);
    })
};

/**
 * crear de salas
 */
exports.create = function (req, res) {
    //creo la sala sin sillas ni programación
    var sala1 = new salas({
        numero: 1,
        cinema: "568321917e45909317e9c399"
        
    });
    
    sala1.save(function (err, sala) {
        if (err)return handleError(res,err);
        var silla1 = new sillas({
            fila:'a',
            numero:1,
            sala: sala._id
        });
        var silla2 = new sillas({
            fila:'a',
            numero:2,
            sala: sala._id
        });
        var silla3 = new sillas({
            fila:'a',
            numero:3,
            sala: sala._id
        });
        var silla4 = new sillas({
            fila:'b',
            numero:1,
            sala: sala._id
        });
        var silla5 = new sillas({
            fila:'b',
            numero:2,
            sala: sala._id
        });
        var silla6 = new sillas({
            fila:'b',
            numero:3,
            sala: sala._id
        });
        silla1.save(function(err, silla) {
            if(err) return handleError(res, err);
            console.log("silla creada 1");
        });
        silla2.save(function(err, silla) {
            if(err) return handleError(res, err);
            console.log("silla creada 2");
        });
        silla3.save(function(err, silla) {
            if(err) return handleError(res, err);
            console.log("silla creada 3");
        });
        silla4.save(function(err, silla) {
            if(err) return handleError(res, err);
            console.log("silla creada 4");
        });
        silla5.save(function(err, silla) {
            if(err) return handleError(res, err);
            console.log("silla creada 5");
        });
        silla6.save(function(err, silla) {
            if(err) return handleError(res, err);
            console.log("silla creada 6");
        });
        sala.sillas.push(silla1);
        sala.sillas.push(silla2);
        sala.sillas.push(silla3);
        sala.sillas.push(silla4);
        sala.sillas.push(silla5);
        sala.sillas.push(silla6);
        sala.save(function (err,sala) {
            if(err)return handleError(res,err);
            console.log("sala 1 creada");
            res.status(200).json(sala);
        });
    });
   
};




function handleError(res, err) {
    return res.status(500).send(err);
};

