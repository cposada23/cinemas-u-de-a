(function () {
    var app = angular.module('cineUdea');
    
    app.controller('carteleraController',['$scope','$state','$http','Auth','$location','$stateParams' ,function ($scope,$state,$http,Auth,$location,$stateParams) {
       $scope.cartelera={};
       $scope.currentUser= Auth.getCurrentUser;
       $scope.cineid= $stateParams.cineID;
       $scope.carteleraid = $stateParams.carteleraID;
       
       $http.get('/api/cartelera/'+$scope.cineid+"/"+$scope.carteleraid).success(function (cartelera) {
           $scope.cartelera= cartelera;
           console.log("correcto");
       }).error(function (error) {
           console.error("fallo" + error);
       });
       
        
    }]);
    
}());