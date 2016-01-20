(function () {
    var app = angular.module('cineUdea');
    
    app.controller('pagoController',['$scope','$state','$http','Auth','$location','usSpinnerService','$uibModalInstance','registroModal','$rootScope', function ($scope,$state,$http, Auth, $location, usSpinnerService, $uibModalInstance, registroModal, $rootScope) {
        $scope.errors = {};
        $scope.boletas = $rootScope.boletas;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.getCurrentUser= Auth.getCurrentUser;
        $scope.precio = {};
        
        
        
        $http.post('/api/boleta/infoBoletas',{boletas:$scope.boletas}).success(function (info) {
            console.log("info : " + JSON.stringify(info));
            $scope.info = info;
        }).error(function (error) {
            console.error(error);
        });
        $scope.cancelar = function () {
            $uibModalInstance.dismiss('cancel');
        };
        
        $scope.pagar = function () {
            if ($scope.getCurrentUser().puntos>= $scope.info.precioPuntos){
                
                
                console.log("lo puede pagar");
                
                $http.post('/api/boleta/pagar' , {porPagar: $scope.boletas, puntos:$scope.info.precioPuntos}).success(function (respuesta) {
                    console.log("respuesta " + JSON.stringify(respuesta));
                }).error(function(error) {
                    console.error(error);
                });
            }else{
                alert("Usted no tiene puntos suficientes para pagar la boleta");
            }
            $uibModalInstance.close();
        };
        
       
        
    }]);
    
}());
    