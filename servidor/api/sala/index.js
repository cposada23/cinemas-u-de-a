'use strict';

var express = require('express');
var controller = require('./sala.controller');


var router = express.Router();

router.get('/create', controller.create); //Crea salas
router.get('/', controller.salas);//Lista todas las salas
router.get('/:id', controller.sala) // lista una sala con su id


module.exports = router;