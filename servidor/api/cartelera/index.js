'use strict';

var express = require('express');
var controller = require('./cartelera.controller');


var router = express.Router();
router.get('/', controller.carteleras); //Obtiene todas las carteleras 
router.get('/:idcine/:cartelera', controller.cartelera); //Obtiene la cartelera de un cine 
router.get('/create', controller.create); // Solo en caso de tener que crear nuevas carteleras

module.exports = router;