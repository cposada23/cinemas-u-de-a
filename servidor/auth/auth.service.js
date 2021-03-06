'use strict';

var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var usuario = require('../api/usuario/usuario.modelo');
var validateJwt = expressJwt({secret:'shhhhhhhh' });

function isAuthenticated() {
    return compose()
    .use(function (req, res, next) {
        if(req.query && req.query.hasOwnProperty('acces_token')){
            req.headers.authorization = 'Bearer ' + req.query.acces_token;
        }
        validateJwt(req, res, next);
        console.log("valide");
    })
    
    .use(function (req,res,next) {
        var bearerHeader = req.headers["authorization"];;
        var token;
        if(typeof bearerHeader !=='undefined'){
            var bearer = bearerHeader.split(" ");
            token = bearer[1];
            req.token = token;
            console.log("todo bien");
            next()
        }else{
            res.status(403);
        }
    });
    
};

function hasRole(roleRequired) {
    if(!roleRequired) throw new Error('Se necesita el rol');
    
    return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
        if(config.roles.indexOf(req.usuario.tipo) >= config.userRoles.indexOf(roleRequired)){
            
            next();
        }
        else{
            res.send(403);
        }
    });
};

// retorna una cookie firmada con el secreto de la app
function singToken(id) {
    return jwt.sign({_id:id}, 'shhhhhhhh', {expiresInMinutes: 60*5});
};

function setTokenCookie(req, res) {
    if(!req.user) return res.status(404).json({message: 'Algo salio mal, intente de nuevo'});
    var token = singToken(req.usuario._id, req.usuario.tipo);
    res.cookie('token', JSON.stringify(token));
    res.redirect('/');
};

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.singToken = singToken;
exports.setTokenCookie = setTokenCookie;