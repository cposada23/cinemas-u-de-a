'use strict';

var express = require('express');
var controller = require('./programacion.controller');


var router = express.Router();


router.get('/:id', controller.programacion) // lista una programacion con su id


module.exports = router;