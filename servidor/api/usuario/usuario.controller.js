'use strict';

var usuario = require('./usuario.modelo');
var jwt = require('jsonwebtoken');



/**
 * crear un nuevo usuario
 */

exports.create = function (req,res) {
    var newUser = new usuario(req.body);
    newUser.save(function (err,usuario) {
        if(err)throw new Error;
        console.log('usuario guardado exitosamente');
        res.json(200,usuario);
    });
};


/**
 * Obtener todos los usuarios
 */

exports.listarUsuarios = function (req, res) {
   
     
    usuario.find({},'-salt -hashedPassword',function (err, usuarios) {
        if(err){return handleError(res,err);}
        console.log("Usuariios");
        return res.status(200).json(usuarios);      
    });    
};

/**
 * Obtener un usuario por medio de su ID
 */
 
exports.obtenerUsuario = function (req,res) {
    var ID = req.params.id;
    usuario.findById(ID,'-salt -hashedPassword', function (err,usuario) {
        if(err){return handleError(res,err);}
        if(!usuario){return res.sendStatus(401)};
        //console.log("encontrado"  +  JSON.stringify(usuario));
        return res.status(200).json(usuario);
    })
}


exports.me = function (req, res,next) {
    console.log("llame al me");
    var id = req.usuario._id;
    usuario.findone({
        _id:id
    }, '-salt -hashedPassword', function (err,usuario) {
        if(err) return next(err);
        if(!usuario) return res.status(401);
        res.json(usuario);
    });
}


function handleError(res, err) {
    return res.status(500).send(err);
};



/**
 * para crear usuarios
 */
 /* usuario.create({
        documento: "102d2338",
        tipoDoc: "cc",
        nombres: "q",
        apellidos: "p",
        email: "q",
        password: "q", 
        sexo:"masculino",
        barrio:"laureew",
        direccion:"caller 1qq01!",
        generoPelicula:"terror",
    }, function(){
        console.log("creado");
    })*/