(function () {
    var app = angular.module('cineUdea');
    
    app.controller('loginController2',['$scope','$state','$http','Auth','$location','usSpinnerService','$uibModalInstance','registroModal', function ($scope,$state,$http, Auth, $location, usSpinnerService, $uibModalInstance, registroModal) {
        $scope.usuario= {};
        $scope.errors = {};
        
        $scope.cancelar = function () {
            $uibModalInstance.dismiss('cancel');
        }
        
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
                    $uibModalInstance.close();
                    //$location.path('/');
                }).catch(function (err) {
                    usSpinnerService.stop('spinner-1');
                    $scope.errors.other = err.message;
                });
            }else{
                usSpinnerService.stop('spinner-1');
            }
        };
        
        $scope.registro = function () {
            $uibModalInstance.dismiss('cancel');
            registroModal();
            
        };
        
    }]);
    
}());
    