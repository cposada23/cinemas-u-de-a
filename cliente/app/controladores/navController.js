(function () {
    var app = angular.module('cineUdea');
    
    app.controller('navController',['$scope','$state','$http','Auth','$location','registroModal' ,'loginModal',function ($scope,$state,$http,Auth,$location, registroModal,loginModal) {
       $scope.isLoggedIn = Auth.isLoggedIn;
       $scope.getCurrentUser= Auth.getCurrentUser;
     
        //listar cines
        $http.get('/api/cinema').success(function (cines) {
            console.log("correcto");
            console.log(JSON.stringify(cines));
            $scope.cines = cines;
        }).error(function (error) {
            console.error(error);
        });
        
        $scope.logout = function () {
            console.log("logg out");
            Auth.logout();
            $location.path('/');
        };
        
        $scope.registro = function () {
            registroModal();
        };
        
        
        $scope.login=function () {
            loginModal();
        };
        
    }]);
    
}());
    