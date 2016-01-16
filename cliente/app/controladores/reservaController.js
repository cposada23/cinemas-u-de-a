(function () {
    var app = angular.module('cineUdea');
    
    app.controller('reservaController',['$scope','$state','$http','Auth','$location','$stateParams','$rootScope','$window' ,function ($scope,$state,$http,Auth,$location,$stateParams, $rootScope, $window) {
      
       $scope.currentUser= Auth.getCurrentUser
       
       
       $scope.idFuncion = $stateParams.funcionID;
       
      
       $scope.llenarDatos = function () {
            $scope.reserva = [];
            $scope.sala = {
               filas:[]
            }
            $http.get('/api/funcion/'+$scope.idFuncion).success(function (funcion) {
                $scope.funcion = funcion;
                $scope.boletas = funcion.boletas;
                var silla = {};
                var x = 0;
                var y = 0;
                for (var i = 0; i<$scope.boletas.length;i++){
                    var fila = {sillas:[]};
                    var f = $scope.boletas[i].silla.fila;
                    y =0;
                    if($scope.boletas[i].silla!==undefined){
                        while ($scope.boletas[i].silla.fila === f){
                            console.log(i);
                            silla.pos = $scope.boletas[i].silla.fila +"-"+ $scope.boletas[i].silla.numero.toString();
                            silla.reservada = $scope.boletas[i].sillaReservada;
                            silla.boleta = $scope.boletas[i]._id;
                            silla.boletaReservada = $scope.boletas[i].sillaReservada;
                            silla.x = x;
                            silla.y = y;
                            fila.sillas.push(silla);
                            silla = {};
                            y++
                            i++;
                            if($scope.boletas[i] === undefined){
                               break;
                            }
                        }
                    }else{
                       i++;
                    }
                    $scope.sala.filas.push(fila);
                    x++;
                    i--;
                }
            }).error(function (error) {
                console.error(error);
            });
        };
       
        $scope.llenarDatos();
        $scope.addBoleta = function (id, x, y) {
           console.log("id "+ id + ", x: "+x + ", y: "+y);
           $scope.sala.filas[x].sillas[y].reservada = !$scope.sala.filas[x].sillas[y].reservada;
           $scope.reserva.push(id);
           console.log("$scope.reserva: "+ $scope.reserva);
        };
        
        $scope.remBoleta = function (id, x, y) {
           console.log("id "+ id + ", x: "+x + ", y: "+y);
           $scope.sala.filas[x].sillas[y].reservada = !$scope.sala.filas[x].sillas[y].reservada;
           var i = $scope.reserva.indexOf(id);
           $scope.reserva.splice(i,1);
           console.log("$scope.reserva: " + $scope.reserva);
        };
       
        $scope.addrem = function (id, x, y, reservada) {
           if(reservada){
               console.log("quitando la reserva");
               $scope.remBoleta(id,x,y);
           }
           else{
               console.log("anadiendo la reserva");
               $scope.addBoleta(id, x, y);
           }
        };
       
        
        $scope.reservar = function () {
            if ($scope.reserva.length!= 0){
               $http.post('/api/boleta/reservar', {reserva: $scope.reserva}).success(function (reserva) {
                   console.log("Reserva "+ JSON.stringify(reserva));
                   $scope.llenarDatos();
               }).error(function (error) {
                   console.error("error" + error);
               })
            }else{
               alert("No ha seleccionado ninguna silla ");
            }
        };
        
        
        
        
        $scope.reservas;
        
        $scope.cancelarReserva = function (id) {
            console.log("cancelando "+ id);
            
            $http.post('/api/boleta/cancelar', {boleta: id}).success(function (response) {
                console.log("cancelad " +  JSON.stringify(response));
                var i = $scope.reservas.indexOf(id);
                console.log("i "+ i);
                console.log("reservas[i-1] " + $scope.reservas[i-1]);
                $scope.reservas.splice(i-1,1);
                $scope.llenarDatos();
            }).error(function(error) {
                console.log("Error " +JSON.stringify(error) );
            });
        };
        
        $scope.misReservas = function () {
            $http.get('/api/boleta/misBoletas/'+$scope.idFuncion).success(function(reservas) {
                if(reservas.length!=0){
                    $scope.reservas = reservas;
                }else{
                    $scope.reservas = "No tiene reservas para esta función";
                }
                console.log("mis reservas");
            }).error(function(error) {
                console.error(error);
            });
        };
        $scope.abrir= function () {
           $window.location.href='api/cinema/programacion';
        };
        
    }]);
    
}());