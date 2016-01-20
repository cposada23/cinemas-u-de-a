(function () {
    var app = angular.module('cineUdea');
    
    app.controller('homeCtrl',['$scope','$state','$http','Auth','$location','usSpinnerService', function ($scope,$state,$http, Auth, $location, usSpinnerService) {
        $scope.usuario= {};
        $scope.errors = {};
       $scope.peliculas = [];
       
       $http.get('/api/pelicula').success(function (peliculas) {
           $scope.peliculas = peliculas;
           console.log("peliculas en el home  " + JSON.stringify(peliculas));
       }).error(function (error) {
           console.error(error);
       });
        
    }]);
    
}());