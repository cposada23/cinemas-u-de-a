(function () {
    var app = angular.module('cineUdea');
    
    app.controller('carteleraController',['$scope','$state','$http','Auth','$location','$stateParams','$rootScope' ,function ($scope,$state,$http,Auth,$location,$stateParams, $rootScope) {
       $scope.cartelera={};
       $scope.peliculas=[];
       $scope.currentUser= Auth.getCurrentUser;
       $scope.cineid= $stateParams.cineID;
       $scope.carteleraid = $stateParams.carteleraID;
       
       
       $http.get('/api/cartelera/'+$scope.cineid+"/"+$scope.carteleraid).success(function (cartelera) {
           $scope.cartelera= cartelera;
           console.log("catelera" + JSON.stringify($scope.cartelera));
           $scope.peliculas = cartelera.peliculas;
           console.log("peliculas" + JSON.stringify($scope.peliculas));
           console.log("correcto");
       }).error(function (error) {
           console.error("fallo" + JSON.stringify(error));
       });
       
        
    }]);
    
}());