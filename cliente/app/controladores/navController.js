(function () {
    var app = angular.module('cineUdea');
    
    app.controller('navController',['$scope','$state','$http','Auth','$location','registroModal' ,'loginModal',function ($scope,$state,$http,Auth,$location, registroModal,loginModal) {
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.getCurrentUser= Auth.getCurrentUser;
        $scope.tab= 1;
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
            $scope.setTab(1);
            $location.path('/');
        };
        
        $scope.registro = function () {
            registroModal();
        };
        
        
        $scope.login=function () {
            loginModal();
        };
        
        $scope.setTab = function (x) {
            console.log("set tab");
            $scope.tab = x;
            console.log($scope.tab);
        }
        
        $scope.isSet= function (x) {
            console.log("is set");
            console.log("scope.tab" + $scope.tab);
            console.log($scope.tab === 1);
            return $scope.tab === x;
        }
    }]);
    
}());
    