'use strict';

var express = require('express');
var controller = require('./boleta.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/reservar', auth.isAuthenticated(), controller.reservar ); // Reserva de boletas para una funcion
router.get('/misBoletas', auth.isAuthenticated(), controller.misBoletas); // Obtener mis boletas 
module.exports = router;