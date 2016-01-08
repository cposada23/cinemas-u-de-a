//Configuracion de express

var path = require('path');
var _ = require('lodash');
var config = require('./environment');


'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');



module.exports = function (app) {
    
    
    app.engine('html', require('ejs').renderFile);
    app.set('view engine' , 'html');
    app.use(compression());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
   // app.use('/cliente',express.static('/home/ubuntu/workspace/cliente'));
    app.use('/cliente',express.static(path.join(config.root, '/cliente')));
    app.use('/public', express.static(path.join(config.root, '/public')));
    app.set('appPath', 'cliente');
    app.use(morgan('dev'));
    app.use(errorHandler());
    
};