'use strict';

var express = require('express');
var passport = require('passport');
var auth =require('../auth.service');
var u = require('../../api/usuario/usuario.modelo');

var router = express.Router();

router.post('/' , function (req, res, next) {
    passport.authenticate('local', function (err, usuario, info) {
        var error = err||info;
        if (error) return res.status(401).json(error);
        if (!usuario) return res.status(401).json({message: 'Algo salio mal, intente de nuevo'});
        
        
        
        var token = auth.singToken(usuario._id, usuario.tipo);
        
        u.findByIdAndUpdate(usuario._id, {$set: { token:token}}, function (err, usuario) {
            if (err) console.error(err);
            else{
                console.log("Update correcto en auth local index");
            }
        });
        
        res.json({token: token});
        
    })(req, res, next)
});

module.exports = router;