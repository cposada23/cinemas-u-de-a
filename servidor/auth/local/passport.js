
var passport = require('passport');
var LocarStrategy = require('passport-local').Strategy;


exports.setup = function (usuario, config) {
    passport.use(new LocarStrategy({
        usernameField: 'email',
        passwordField: 'password' //virtual del modelo
    }, function (email, password, done) {
        usuario.findOne({email: email.toLowerCase()}, function (err, usuario) {
            if(err)return done(err);
            
            if(!usuario){
                return done(null, false, {message: 'El email no esta registrado.'});
            }
            if(!usuario.authenticate(password)){
                return done(null,false , {message : 'La contraseña es incorrecta'});
            }
            return done(null, usuario);
        });
    }
    ));
};

