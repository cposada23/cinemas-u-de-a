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
    app.use(methodOverride()); //soporte para HTTP PUT y DELETE 
    app.use(cookieParser());
   // app.use('/cliente',express.static('/home/ubuntu/workspace/cliente'));
    app.use('/cliente',express.static(path.join(config.root, '/cliente')));
    app.use('/public', express.static(path.join(config.root, '/public')));
    app.set('appPath', 'cliente');
    app.use(morgan('dev'));
    app.use(errorHandler());
    // Add headers
    app.use(function (req, res, next) {
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, X-ACCESS_TOKEN, Authorization,Access-Control-Allow-Origin'); //para poder cosumir la api con token 
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });
};