'use strict';

//configuraciones para el servidor 
var path  = require('path');
var _ = require('lodash');



var all= {
    root: path.normalize(__dirname + '/../../..'),
    port: process.env.PORT || 3000,
    
    ip: process.env.IP ||"0.0.0.0",
    
    roles: ['invitado' ,  'usuario' , 'admin'],
    
    secrets: {
        session: 'cine-udea'
    },
    
    mongo:{
        uri:'mongodb://cineudea:1234@ds027335.mongolab.com:27335/cineudeadb',
        //uri: process.env.MONGO_URI,
        options:{
             server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }  
            
        }
        
    }
    
    
    
};

module.exports = all;