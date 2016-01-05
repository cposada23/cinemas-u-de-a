(function () {
    var app = angular.module('cineUdea');
    
    app.controller('registroController',['$scope','$state','$http', function ($scope,$state,$http) {
        
        
        $scope.registro = function (form) {
            $scope.submitted = true;
        };
        
    }]);
    
}());
    
