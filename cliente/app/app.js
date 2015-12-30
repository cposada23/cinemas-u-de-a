(function(){
    var app = angular.module('cineUdea', ['ui.router']);
    //configuracion de la app
    app.config(function($stateProvider, $urlRouterProvider){
        //default
        $urlRouterProvider.otherwise('home');
        
        $stateProvider
        .state('Home',{
            url:"/home",
            templateUrl:"cliente/templates/home.html",
            controller:"homeCtrl"
        })
        .state('Registro',{
            url:"/registro",
            templateUrl: "cliente/templates/registro.html",
            controller:"registroController"
        })
        /*
        .state('Cartelera',{
            url:"/cartelera/:cineNombre/:carteleraID",
            templateUrl: "cliente/templates/cartelera.html",
            controller:"carteleraCtrl"
        })
        
        .state('Pelicula',{
            url:"/pelicula/:peliculaID",
            templateUrl: "cliente/templates/pelicula.html",
            controller:"peliculaController"
        });
        */
    });
}());
