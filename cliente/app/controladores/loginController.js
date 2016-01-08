(function () {
    var app = angular.module('cineUdea');
    
    app.controller('loginController',['$scope','$state','$http','Auth','$location','usSpinnerService', function ($scope,$state,$http, Auth, $location, usSpinnerService) {
        $scope.usuario= {};
        $scope.errors = {};
        
        $scope.login=function (form) {
            $scope.submitted = true;
            usSpinnerService.spin('spinner-1');
            
            
            if(form.$valid){
                usSpinnerService.spin('spinner-1');
                Auth.login({
                    email: $scope.usuario.email,
                    password: $scope.usuario.password
                }).then(function () {
                    console.log("Login exitoso------");
                    usSpinnerService.stop('spinner-1');
                    $location.path('/');
                }).catch(function (err) {
                    usSpinnerService.stop('spinner-1');
                    $scope.errors.other = err.message;
                });
            }
        };
        
    }]);
    
}());
    