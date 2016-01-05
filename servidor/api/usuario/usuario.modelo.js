'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
    documento: String,
    tipoDoc: String,
    nombres: String,
    apellidos: String,
    email: {type:String , lowercase: true},
    telefono:{type:String , default:''},
    sexo:String,
    barrio:String,
    direccion:String,
    fechaNacimiento:{type:Date , default: Date.now},
    celular: {type:String , default:''},
    generoPelicula:String,
    salt:String,
    hashedPassword: String,
    tipo:{
        type:String,
        default:'usuario'
    },
    puntos: {type: Number, default: 0},
    token: {String , default:''}
});


//virtuals

UserSchema.virtual('password').set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
}).get(function () {
    return this._password;
});

//perfil publico
UserSchema.virtual('profile').get(function () {
    return{
        'nombre': this.nombres,
        'tipo': this.tipo
    };
});


//informacion que se pondra en el token
/*UserSchema.virtual('token').get(function() {
    return {
        '_id': this._id,
        'tipo': this.tipo
    };
});
*/

/**
 * validaciones
 */

//valida que el email no este registrado
UserSchema.path('email').validate(function (value, respond) {
    var self = this;
    this.constructor.findOne({email:value}, function (err,usuario) {
        if(err) throw err;
        if(usuario){
            if(self.id=== usuario.id)return respond(true);
            return respond(false);
        }
        respond(true);
    });
}, 'El email ya esta en uso.');

var validatePresenceOf = function (value) {
    return value && value.length;
};


/**
 * no se si se necesita 
 */

UserSchema.pre('save',function (next) {
    if(!this.isNew) return next();
    
    if(!validatePresenceOf(this.hashedPassword)) next(new Error('Invalid Password'));
    else next();
    
});



/**
 * metodos
 */


UserSchema.methods = {
    /**
     * autenticacion 
     * 
     * @params {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
     
    /**
    * make salt
    * 
    * @return {string}
    * @api public
    */
    makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
    },
    
    /**
     * Encriptar contraseña
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function (password) {
        if(!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password,salt,10000,64).toString('base64');
    }
};


module.exports = mongoose.model('usuarios' , UserSchema);    

