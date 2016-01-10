'use strict';

var express = require('express');
var controller = require('./cinema.controller');


var router = express.Router();

router.get('/', controller.listar); //Listar todos los cinemas

/**
 * se pueden borrar es solo para llenar la base de datos
 */
 
router.get('/create', controller.create);//Llenar la base de datos
router.get('/createprecios', controller.createprecios); // Crear los precios 
router.get('/precios', controller.precios); //listar los precios del cinema
router.get('/precios/:localidad/:formato', controller.precio);//buscar un precio por localidad y formato

router.get('/borrar', controller.borrar); //para borrar collections
router.get('/boletas' , controller.boletas); //listar las todas las boletas en la base de datos 
router.get('/programacion' , controller.progcine); // Lista el cine con su programacion;
module.exports = router;