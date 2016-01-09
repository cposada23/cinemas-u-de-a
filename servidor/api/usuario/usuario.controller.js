'use strict';

var usuario = require('./usuario.modelo');
var jwt = require('jsonwebtoken');



/**
 * crear un nuevo usuario 
 */

exports.create = function (req,res) {
    console.log("usuario en create: " + JSON.stringify(req.body));
    var newUser = req.body;
    
    console.log("Usuario en create" + JSON.stringify(newUser));
    usuario.create(newUser, function (err,user) {
        if(err){
            console.log("fallo");
            return handleError(res, err);
        }
        else {
            console.log("si sale algo devuelve el user" + JSON.stringify(user));
            var token = jwt.sign({_id:user._id}, 'shhhhhhhh', {expiresInMinutes: 60*5});
            user.token = token;
            usuario.findByIdAndUpdate(user._id, {$set: {token:token}}, function (err, usuario) {
                if (err) return handleError(res,err);
                else{
                    console.log("Usuario actualizado en create. " + usuario);
                    console.log("creado");
                    res.status(200).json({token:token});
                }
            });
            
        }
    });
    /*
    var newUser = new usuario(req.body);
    
    console.log("Nuevo usuario " + JSON.stringify(newUser));
    newUser.save(function (err,usuario) {
        if(err)return handleError(res, err);
        console.log('usuario guardado exitosamente');
        res.status(200).json({token:token});
    });*/
};


/**
 * Obtener todos los usuarios
 */

exports.listarUsuarios = function (req, res) {
   
    usuario.find({},'-salt -hashedPassword -token',function (err, usuarios) {
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
    usuario.findById(ID,'-salt -hashedPassword -token', function (err,usuario) {
        if(err){return handleError(res,err);}
        if(!usuario){return res.sendStatus(401)};
        //console.log("encontrado"  +  JSON.stringify(usuario));
        return res.status(200).json(usuario);
    })
}

/**
 * retorna mi informacion de usuario
 */
exports.me = function (req, res,next) {
    console.log("llame al me");
    var token = req.token;
    usuario.findOne({
        token:token
    }, '-salt -hashedPassword -token', function (err,usuario) {
        if(err) return next(err);
        if(!usuario) return res.status(401);
        console.log("Todo correcto en el me");
        res.json(usuario);
    });
}


function handleError(res, err) {
    console.log("Error" + err);
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