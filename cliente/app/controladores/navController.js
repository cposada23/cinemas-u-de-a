(function () {
    var app = angular.module('cineUdea');
    
    app.controller('navController',['$scope','$state','$http', function ($scope,$state,$http) {
        
        
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
        
        var id = "56834dcd927556f7183c86fa";
        
        //Retornar un usuario con el id 
        $http.get('/api/usuario/'+ id ).success(function(usuario) {
            console.log("Usuario encontrado" + JSON.stringify(usuario));
        }).error(function(error) {
            console.error(error);
        });
        
    }]);
    
}());
    
