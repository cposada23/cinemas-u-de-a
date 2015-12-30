'use strict';

var express = require('express');
var passport = require('passport');
var auth =require('../auth.service');

var router = express.Router();

router.post('/' , function (req, res, next) {
    passport.authenticate('local', function (err, usuario, info) {
        var error = err||info;
        if (error) return res.status(401).json(error);
        if (!usuario) return res.status(401).json({message: 'Algo salio mal, intente de nuevo'});
        
        var token = auth.singToken(usuario._id, usuario.tipo);
        res.json({token: token});
        
    })(req, res, next)
});

module.exports = router;