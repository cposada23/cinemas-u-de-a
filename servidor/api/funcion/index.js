'use strict';

var express = require('express');
var controller = require('./funcion.controller');

var router = express.Router();

router.get('/:id', controller.funcion); //Retorna una funcion por su id


module.exports = router;