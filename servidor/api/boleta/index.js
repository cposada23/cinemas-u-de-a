'use strict';

var express = require('express');
var controller = require('./boleta.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/reservar', auth.isAuthenticated(), controller.reservar ); // Reserva de boletas para una funcion
router.post('/cancelar', auth.isAuthenticated(), controller.cancelar); // Cancela una reserva
router.get('/misBoletas', auth.isAuthenticated(), controller.misBoletas); // Obtener mis boletas 
router.get('/misBoletas/:idFuncion', auth.isAuthenticated(), controller.misBoletasPorFuncion);// Obtener las boletas de una funcion en especifico
router.get('/:idUsuario/:idFuncion', controller.get);
module.exports = router;