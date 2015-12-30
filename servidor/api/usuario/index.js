'use strict';

var express = require('express');
var controller = require('./usuario.controller');


var router = express.Router();

router.get('/', controller.listarUsuarios); //Listar todos los usuarios
router.post('/', controller.create);  //crear un nuevo usuario
router.get('/:id', controller.obtenerUsuario); //Obtener un usuario por su ID

module.exports = router;