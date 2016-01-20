(function () {
    var app = angular.module('cineUdea');
    
    app.controller('perfilController', ['$scope','$http', 'Auth','pagoModal', 'loginModal', '$rootScope' , function ($scope,$http, Auth, pagoModal, loginModal, $rootScope) {
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.getCurrentUser= Auth.getCurrentUser;
        $scope.tabs = [
            { title:'Dynamic Title 1', content:'Dynamic content 1' },
            { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
          ];
        
        $scope.boletas = [];
        $scope.usuario ={
            funciones:[]
        };
        
        $scope.porPagar = [];
        $scope.noPagadas = [];
        $scope.pagadas = [];
        $scope.cargarDatos = function () {
            console.log("cargando datos");
            $http.get('/api/boleta/misBoletas').success(function (boletas) {
                $scope.usuario.funciones =[];
                console.log("Boletas  " + JSON.stringify(boletas));
                var keys = Object.keys(boletas);
                console.log("keys " + keys);
                
                
                
                for (var key in keys) {
                    console.log("F: " +key+" "+ boletas[keys[key]]);
                    boletas[keys[key]].pelicula  = boletas[keys[key]].datos[0].pelicula;
                    $scope.usuario.funciones.push(boletas[keys[key]]);
                    
                }
                console.log("$scope.usuario " + JSON.stringify($scope.usuario) );
                if(boletas.length >0){
                    console.log("boletas" + JSON.stringify(boletas));
                    $scope.boletas = boletas;
                }else{
                    $scope.mensaje = "No tiene boletas reservadas";
                }
            }).error(function (error) {
                console.error("error "+JSON.stringify(error));
            });
        };
        $scope.cargarDatos();
        
        
        $scope.cancelarReserva= function (id) {
            console.log("cancelando "+ id);
            
            $http.post('/api/boleta/cancelar', {boleta: id}).success(function (response) {
                console.log("cancelad " +  JSON.stringify(response));
                //var i = $scope.reservas.indexOf(id);
                //console.log("i "+ i);
                //console.log("reservas[i-1] " + $scope.reservas[i-1]);
                //$scope.reservas.splice(i-1,1);
                $scope.cargarDatos();
            }).error(function(error) {
                console.log("Error " +JSON.stringify(error) );
            });
        };
        
        $scope.pagar = function (boleta) {
            var i = $scope.porPagar.indexOf(boleta);
            console.log("boleta" +  boleta);
            if (i===-1){
                console.log("no estaba ");
                $scope.porPagar.push(boleta);
            }else{
                console.log("ya estaba");
                console.log("i:" +i);
                $scope.porPagar.splice(i,1);
            }
            console.log("$scope.porpagar: " + $scope.porPagar);
            //$rootScope.boleta = boleta;
            
            //pagoModal();
        };
        
        $scope.confirmar = function () {
            console.log("$scope.porpagar " + $scope.porPagar);
            if($scope.porPagar.length===0){
                alert("no hay boletas seleccionadas");
            }else{
                console.log("por el else");
                $rootScope.boletas = $scope.porPagar;
                pagoModal().then(function () {
                    console.log("por el thennnnnnnnnnnnnnn");
                    $scope.cargarDatos();
                }).catch(function () {
                    console.log("por el catchhhhhhhhhhhhhhhhhhhhh")
                    //return $state.go('Home');
                });
                
            }
        };
        
        $scope.disable = function (id) {
            var i = $scope.porPagar.indexOf(id);
            if (i===-1)return false;
            else return true;
        }
        
    }]);
}());