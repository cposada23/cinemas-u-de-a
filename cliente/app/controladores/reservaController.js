(function () {
    var app = angular.module('cineUdea');
    
    app.controller('reservaController',['$scope','$state','$http','Auth','$location','$stateParams','$rootScope','$window' ,function ($scope,$state,$http,Auth,$location,$stateParams, $rootScope, $window) {
      
       $scope.currentUser= Auth.getCurrentUser
       
       
       $scope.idFuncion = $stateParams.funcionID;
       
       $http.get('/api/funcion/'+$scope.idFuncion).success(function (funcion) {
           $scope.funcion = funcion;
           console.log("$scope.funcion" + JSON.stringify($scope.funcion));
           
       }).error(function (error) {
           console.error(error);
       })
       
       $scope.abrir= function () {
           $window.location.href='api/cinema/programacion';
       }
        
    }]);
    
}());