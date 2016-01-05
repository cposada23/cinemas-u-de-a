(function () {
    var app = angular.module('cineUdea');
    
    app.controller('loginController',['$scope','$state','$http','Auth','$location', function ($scope,$state,$http, Auth, $location) {
        $scope.usuario= {};
        $scope.errors = {};
        
        $scope.login=function (form) {
            $scope.submitted = true;
            
            if(form.$valid){
                Auth.login({
                    email: $scope.usuario.email,
                    password: $scope.usuario.password
                }).then(function () {
                    console.log("Login exitoso------");
                    $location.path('/');
                }).catch(function (err) {
                    $scope.errors.other = err.message;
                });
            }
        };
        
    }]);
    
}());
    