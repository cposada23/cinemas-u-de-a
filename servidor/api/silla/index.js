'use strict';

var express = require('express');
var controller = require('./silla.controller');


var router = express.Router();

router.get('/', controller.sillas);//Lista todas las salas


module.exports = router;