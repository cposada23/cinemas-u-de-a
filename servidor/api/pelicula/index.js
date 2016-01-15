'use strict';

var express = require('express');
var controller = require('./pelicula.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.peliculas); //Obtiene todas las peliculas.
router.get('/create', controller.create); // Solo en caso de tener que crear nuevas peliculas
router.get('/:id' , controller.pelicula); //Obtiene una pelicula por su id
router.post('/comentar',auth.isAuthenticated(), controller.comentar); // Añade un comentario a la pelicula
router.get('/horarios/:idCine/:idPelicula', controller.listarHorarios); //Lista los horarios, la sala y la funcion en la que se esta dando una pelicula en un cine determinado
module.exports = router;