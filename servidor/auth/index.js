'use strict';

var express = require('express');
var config = require('../config/environment');
var usuario = require('../api/usuario/usuario.modelo');


// configuracion del passport 
require('./local/passport').setup(usuario, config);

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;