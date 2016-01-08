'use strict';

angular.module('cineUdea').factory('Auth', function Auth($location, $rootScope, $http, Usuario, $cookieStore, $q) {
    var currentUser = {};
    if($cookieStore.get('token')){
        currentUser = Usuario.get();
    }
    
    return{
        
        /**
         * autentica al usuario y guarda el token
         */
         login: function (usuario, callback) {
             var cb = callback || angular.noop;
             var deferred = $q.defer();
             console.log("Llame al login");
             $http.post('/auth/local' ,{
                 email:usuario.email,
                 password: usuario.password
             }).success(function (data) {
                 console.log("data"+ JSON.stringify(data));
                 $cookieStore.put('token', data.token);
                 currentUser = Usuario.get();
                 deferred.resolve(data);
                 return cb();
             }).error(function (error) {
                 this.logout();
                 deferred.reject(error);
                 return cb(error);
             }.bind(this));
             return deferred.promise;
         },
         
         /**
          * borra el acces token y la informacion del usuario
          */
        logout: function () {
            console.log("logotu auth service");
            $cookieStore.remove('token');
            console.log($cookieStore.get('token'));
            currentUser = {};
        },
        
        /**
         * creo un nuevo usuario
         */
         
         createUser:function (usuario, callback) {
             var cb = callback || angular.noop;
             
             return Usuario.save(usuario, function (data) {
                $cookieStore.put('token', data.token);
                currentUser = Usuario.get();
                return cb(usuario);
                 
             }, function (err) {
                 this.logout();
                 return cb(err);
             }.bind(this)).$promise;
         },
        
        
        /**
         * Obtiene la informacion del usuario autenticado
         */
         getCurrentUser: function () {
             return currentUser;
         },
         
         isLoggedIn: function () {
             return currentUser.hasOwnProperty('tipo');
         },
         
         isLoggedInAsync: function (cb) {
           if(currentUser.hasOwnProperty('$promise')){
               currentUser.$promise.then(function () {
                   cb(true);
               }).catch(function () {
                   cb(false);
               });
           }else if(currentUser.hasOwnProperty('tipo')){
               cb(true);
           }else{
               cb(false);
           }
         },
         
         
         getToken: function () {
             return $cookieStore.get('token');
         }
         
        
    }
})