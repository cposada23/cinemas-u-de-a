(function () {
    var app = angular.module('cineUdea');
    
    app.controller('peliculaController',['$scope','$state','$http','Auth','$location','$uibModal','$stateParams', 'loginModal',function ($scope,$state,$http,Auth,$location, $uibModal,$stateParams, loginModal) {
        $scope.peliculaid = $stateParams.peliculaID;
        $scope.getCurrentUser= Auth.getCurrentUser;
        $scope.isLoggedIn = Auth.isLoggedIn;
        
        $scope.nuevoComentario="";
        
        
        $http.get('/api/pelicula/'+$scope.peliculaid).success(function (pelicula) {
            console.log("pelicula" + JSON.stringify(pelicula));
            $scope.pelicula = pelicula;
        }).error(function (error) {
            console.error("error" + error);
        });
        
        
        $scope.addComentario = function (form) {
            var comentario ={
                texto:  $scope.nuevoComentario,
                autor: $scope.getCurrentUser().nombres,
                autorID:$scope.getCurrentUser()._id,
                fecha: new Date()
            };
            
            
            console.log("comentario" + JSON.stringify(comentario));
            $http.post('/api/pelicula/comentar', {comentario:comentario, id:$scope.pelicula._id}).success(function (s) {
                console.log("pelicula en el controler exitoso " + s);
                $scope.pelicula.comentarios.push(comentario);
                $scope.nuevoComentario="";
                $scope.comentario = {};
                
            }).error(function (error) {
                alert("El comentario no se guardo intente de nuevo mas tarde");
                console.error("error" + error);
            });
        
            
        };
        
        $scope.login = function () {
            loginModal();
        };
        
        
        
        
    }]);
    
}());
    