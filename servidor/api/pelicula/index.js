'use strict';

var express = require('express');
var controller = require('./pelicula.controller');


var router = express.Router();

router.get('/', controller.peliculas); //Obtiene todas las peliculas.
router.get('/create', controller.create); // Solo en caso de tener que crear nuevas peliculas

module.exports = router;