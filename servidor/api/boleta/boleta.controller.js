var boletas = require('./boleta.modelo');
var usuarios = require('../usuario/usuario.modelo');
var salas = require('../sala/sala.modelo');
var cinemas = require('../cinema/cinema.modelo');
var peliculas = require('../pelicula/pelicula.modelo');
var async = require('async');
//var qr = require("qr-image");
var qr = require('qr-js');

var fs = require("fs-extra");
var path = require('path');
var targetPath = path.join(__dirname, "../../../public/recursos/qr/");



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
            boletas.findByIdAndUpdate(boleta,{$set:{sillaReservada:true, usuario:usuario._id}}, function (err,boleta) {
                if(err)return handleError(res, err);
                console.log("Boleta " + JSON.stringify(boleta));
                console.log("boleta guardada generando qr");
                var uploadDate = new Date().toISOString();
                var qrPath = targetPath + String(boleta._id)+uploadDate+'.png';
                
                qr.saveSync(String(boleta._id) + String(Date.now()) , qrPath);
                var ruta = "https://cinemas-udea-cposada23.c9users.io/public/recursos/qr/"+String(boleta._id)+uploadDate+'.png';
                console.log("Ruta" + ruta);
                boleta.qr = ruta;
                boleta.save(function (err, boleta) {
                    if(err)return handleError(res, err);
                    
                    console.log("boleta guardada con qr");
                    callback();
                });
                
                
                
            });
        }, function (err) {
            if(err) return handleError(res,err);
            boletas.find({usuario:usuario._id}, function (err, boletas) {
                if (err){
                    console.error("error buscando bolertas del usuario" + err);
                    return handleError(res,err);
                }
                return res.status(200).json({reservas:'guardadas' , boletas:boletas});
            });
            
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
                boleta.reserva = true;
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
        boletas.find({usuario:usuario._id}).populate('silla funcion').exec(function (err, boletas) {
            if(err)return handleError(res, err);
            var funciones = {};
            for (var boleta in boletas) {
             
                var funcion = String(boletas[boleta].funcion._id);
                console.log("Funcion: " ,funcion);
                funciones[funcion]= {datos:[]};
            }
            console.log(funciones);
            
            async.forEach(boletas, function (boleta, callback) {
                salas.findOne({_id:boleta.silla.sala}, function(err, sala) {
                    if(err)console.error("error buscando la sala "+ JSON.stringify(err));
                    else{
                        var dato = {};
                        dato.sala = "Sala "+ sala.numero;
                        dato.silla = boleta.silla.fila + "-" + boleta.silla.numero;
                        cinemas.findOne({_id:sala.cinema}, function (err, cinema) {
                            if(err)console.error("error buscando el cinema")
                            else{
                                dato.cinema = cinema.nombre;
                                
                                peliculas.findOne({_id:boleta.funcion.pelicula},function (err, pelicula) {
                                    if (err)console.log("Eroor Buscando pelicula");
                                    else{
                                        dato.pelicula= pelicula.nombre;
                                        dato.hora = boleta.funcion.hora;
                                        if(boleta.reserva===true){
                                            dato.estado ="En reserva";
                                        }
                                        else{
                                            dato.estado = "Pagada";
                                        }
                                        dato.id = boleta._id;
                                        dato.qr = boleta.qr;
                                        funciones[String(boleta.funcion._id)].datos.push(dato);
                                        callback();
                                    }
                                });
                            }
                        });
                        
                    }
                });
            }, function (err) {
                if(err) return handleError(res, err);
                console.log("funciones: " + JSON.stringify(funciones));
                return res.status(200).json(funciones);
            });
            
            //console.log("Boletas " +JSON.stringify( boletas));
            //return res.status(200).json(boletas);
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

exports.miBoleta = function (req, res) {
    
    console.log("llame a mi boleta");
    /*usuarios.findOne({token:token}, function(err, usuario ) {
        console.log("usuario encontrado en mi boleta" + usuario._id);
        if(err)return next(err);
        if(!usuario) return res.status(401);
        boletas.findOne({_id:req.params.idBoleta,usuario:usuario._id}).populate('precio').exec(function (err, boleta) {
            if(err)return handleError(res, err);
            console.log("boleta encontrada");
            return res.status(200).json(boleta);
        });
    });*/
    
    boletas.findOne({_id:req.params.idBoleta}).populate('precio').exec(function (err, boleta) {
        if (err)return handleError(res, err);
        console.log("Boleta Encontrada");
        return res.status(200).json(boleta);
    });
};

exports.info = function (req ,res) {
    var porPagar = req.body.boletas;
    var preciosPlata= [];
    var preciosPuntos = [];
    var puntosGanados  = [];
    var info = {};
    async.forEach(porPagar, function(boleta, callback) {
        boletas.findOne({_id: boleta}).populate('precio').exec(function (err, boleta) {
            if(err)return handleError(res, err);
            console.log("boleta encontrada")
            preciosPlata.push(boleta.precio.precioDinero);
            preciosPuntos.push(boleta.precio.precioPuntos);
            puntosGanados.push(boleta.precio.puntosGanados);
            callback();
        });
    },function (err) {
        if(err) return handleError(res, err);
        var precioTotal = 0;
        var precioPuntos = 0;
        var puntosTotales = 0;
        for (var i in preciosPlata) {
            precioTotal = precioTotal + preciosPlata[i];
            precioPuntos = precioPuntos + preciosPuntos[i];
            puntosTotales = puntosTotales + puntosGanados[i];
        }
        info.precioDinero = precioTotal;
        info.precioPuntos = precioPuntos;
        info.puntosGanados = puntosTotales;
        
        console.log("info: " + JSON.stringify(info));
        return res.status(200).json(info);
    });
};

exports.pagar = function (req, res, next) {
    var porPagar = req.body.porPagar;
    var puntosTotales = req.body.puntos;
    console.log("porPagar " + porPagar);
    var token = req.token;
    usuarios.findOne({token:token}, function (err, usuario) {
        if(err)return handleError(res, err);
        if(usuario.puntos<puntosTotales)return res.status(404).json({sin:'Puntos'});
        console.log("usuario encontrado");
        async.forEach(porPagar, function(boleta, callback) {
            boletas.findOne({_id:boleta}, function (err, boleta) {
                if(err)return handleError(res, err);
                console.log("boleta encontrada");
                boleta.reserva = false;
                boleta.save(function(err, boleta){
                   if (err)return handleError(res, err);
                   callback();
                });
            });
        },function (err) {
            if(err) return handleError(res, err);
            var puntos = usuario.puntos;
            puntos = puntos - puntosTotales;
            usuario.puntos = puntos;
            usuario.save(function (err, usuario) {
                if(err)return handleError(res, err);
                return res.status(200).json({correcto:'todo', usuario:usuario});
            });
            
        });
        
    });

};
function handleError(res, err) {
    return res.status(500).send(err);
};

