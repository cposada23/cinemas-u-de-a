var boletas = require('./boleta.modelo');
var usuarios = require('../usuario/usuario.modelo');
var async = require('async');

/**
 * reservar boletas
 */

exports.reservar = function (req, res,next) {
    console.log("llame a reservar");
    var reservas = req.body.reserva;
    console.log(JSON.stringify(reservas))
    var token = req.token;
    usuarios.findOne({
        token:token
    }, '-salt -hashedPassword -token', function (err,usuario) {
        if(err) return next(err);
        if(!usuario) return res.status(401);
        console.log("Todo correcto encontre el usuario en reservar");
        
        async.forEach(reservas, function (boleta, callback) {
            boletas.findByIdAndUpdate(boleta,{$set:{sillaReservada:true, usuario:usuario._id}}, function (boleta) {
                if(err)return handleError(res, err);
                console.log("boleta guardada");
                callback();
            })
        }, function (err) {
            if(err) return handleError(res,err);
            boletas.find({usuario:usuario._id}, function (err, boletas) {
                if (err){
                    console.error("error buscando bolertas del usuario" + err);
                    return handleError(res,err);
                }
                return res.status(200).json({reservas:'guardadas' , boletas:boletas});
            })
            
        });
    });
   
};

/**
 * cancelar la reserva de una boleta
 */
exports.cancelar = function (req, res, next)   {
    console.log("cancelar");
    var token = req.token;
    var id = req.body.boleta;
    usuarios.findOne({
        token:token
    }, '-salt -hashedPassword -token', function (err,usuario) {
        if(err) return next(err);
        if(!usuario) return res.status(401);
        console.log("Todo correcto encontre el usuario en cancelar");
        boletas.findOne({_id:id,usuario: usuario._id}, function (err, boleta) {
            if (err)return handleError(err);
            else if(boleta!=undefined){
                boleta.sillaReservada = false;
                boleta.usuario = "";
                boleta.qr = "";
                console.log("Boleta en cancelar " + JSON.stringify(boleta));
                boleta.save(function (err, boleta) {
                    if(err)return handleError(res, err);
                    console.log("Boleta cancelada");
                    console.log("boleta" + JSON.stringify(boleta));
                    return res.status(200).json({todo:'correcto'});
                });
            }
            else{
                res.status(404).json({todo:'mal'});
            }
        });
    });
};

exports.misBoletas = function (req, res, next) {
    console.log("llame a mis boletas");
    var token = req.token;
    usuarios.findOne({token:token},function (err, usuario) {
        if(err)return next(err);
        if(!usuario) return res.status(401);
        boletas.find({usuario:usuario._id}, function (err, boletas) {
            if(err)return handleError(res, err);
            return res.status(200).json(boletas);
        });
    });
};


exports.misBoletasPorFuncion = function (req, res ,next) {
    console.log("llame a mis boletas");
    var token = req.token;
    usuarios.findOne({token:token},function (err, usuario) {
        if(err)return next(err);
        if(!usuario) return res.status(401);
        console.log("Encontre el usuario" + usuario._id );
        boletas.find({usuario:usuario._id, funcion:req.params.idFuncion}).populate('silla').exec(function (err, boletas) {
            if(err)return handleError(res, err);
            console.log("Boletas " +JSON.stringify( boletas));
            return res.status(200).json(boletas);
        });
    });
};

exports.get = function (req, res, next) {
    boletas.find({usuario:req.params.idUsuario, funcion:req.params.idFuncion},function (err,boletas) {
        if(err)return handleError(res,err);
        return res.status(200).json(boletas);
    });
};




function handleError(res, err) {
    return res.status(500).send(err);
};

