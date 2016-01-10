'use strict';

var express = require('express');
var controller = require('./cinema.controller');


var router = express.Router();

router.get('/', controller.listar); //Listar todos los cinemas
router.get('/create', controller.create);



module.exports = router;