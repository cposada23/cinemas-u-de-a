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
                 console.log("current User en el auth service ccuando llame el login" + JSON.stringify(currentUser));
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
            $cookieStore.remove('token');
            currentUser = {};
        },
        
        
        /**
         * Obtiene la informacion del usuario autenticado
         */
         getCurrentUser: function () {
             return currentUser;
         }
         
        
    }
})