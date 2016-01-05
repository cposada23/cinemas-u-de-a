(function () {
    var app = angular.module('cineUdea');
    
    app.controller('navController',['$scope','$state','$http','Auth','$location' ,function ($scope,$state,$http,Auth,$location) {
        
        
        //listar cines
        $http.get('/api/cinema').success(function (cines) {
            console.log("correcto");
            console.log(JSON.stringify(cines));
            $scope.cines = cines;
        }).error(function (error) {
            console.error(error);
        });
        
        //listar Usuarios prueba borrar
        $http.get('/api/usuario').success(function(usuarios) {
            console.log("usuarios");
            console.log(JSON.stringify(usuarios));
            console.log("id " + usuarios[0]._id);
            
        }).error(function(error) {
            console.error(error);
        });
        
        var id = "5684439b387280ba03710f59";
        
        //Retornar un usuario con el id 
        $http.get('/api/usuario/'+ id ).success(function(usuario) {
            console.log("Usuario encontrado" + JSON.stringify(usuario));
        }).error(function(error) {
            console.error(error);
        });
        
        var token = {};
        
        /**  //login
        $http.post('/auth/local', {email: 'q', password:'q'}).success(function (data) {
            console.log("login correcto");
            console.log(JSON.stringify(data));
            token = data.token;
            
        }).error(function (error) {
            console.error('fallo' + error);
        });
        
        */
        
        $scope.logout = function () {
            console.log("logg out");
            Auth.logout();
            $location.path('/login');
        }
        
    }]);
    
}());
    