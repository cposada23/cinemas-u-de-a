(function () {
    var app = angular.module('cineUdea');
    
    app.controller('registroController2',['$scope','$state','$http','Auth','$location','$uibModalInstance' ,function ($scope,$state,$http, Auth, $location, $uibModalInstance) {
        $scope.usuario ={};
        $scope.errors = {};
        
        $scope.cancelar = function () {
            $uibModalInstance.dismiss('cancel');
        }
        
        $scope.registro = function (form) {
            
            $scope.enviada = true;
            console.log($scope.usuario.fechaNacimiento);
            console.log(form.$valid);
            console.log( "Usuarilllll"  + JSON.stringify($scope.usuario));
            if (form.$valid){
                Auth.createUser({
                    documento: $scope.usuario.documento,
                    tipoDoc: $scope.usuario.tipoDoc,
                    nombres: $scope.usuario.nombres,
                    apellidos: $scope.usuario.apellidos,
                    email: $scope.usuario.email,
                    telefono:$scope.usuario.telefono,
                    sexo:$scope.usuario.sexo,
                    barrio:$scope.usuario.barrio,
                    direccion:$scope.usuario.direccion,
                    //fechaNacimiento:$scope.usuario.fechaNacimiento,
                    celular:$scope.usuario.celular,
                    generoPelicula:$scope.usuario.generoPelicula,
                    password:$scope.usuario.password
                }).then(function () {
                    console.log("Usuario creado");
                    $uibModalInstance.close();
                   // $location.path('/')
                }).catch(function (err) {
                    console.log("err" + err);
                    err = err.data;
                    console.log("eer.data " + JSON.stringify(err));
                    $scope.errors = {};
                    
                    angular.forEach(err.errors, function (error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                    console.log("Errores "+ JSON.stringify($scope.errors));
                });
                
            }
        };
        
    }]);
    
}());
    
