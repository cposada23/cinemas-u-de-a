(function(){
    var app = angular.module('cineUdea', ['ui.router', 'ngCookies' , 'ngResource', 'angularSpinner','ngAnimate', 'ui.bootstrap']);
    //configuracion de la app
    app.config(function($stateProvider, $urlRouterProvider,  $httpProvider){
        //default
        $urlRouterProvider.otherwise('home');
        //$locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
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
        .state('Login',{
            url:"/login",
            templateUrl:"cliente/templates/login.html",
            controller:"loginController"
            
        })
        .state('Cartelera',{
            url:"/cartelera/:cineID/:carteleraID",
            templateUrl:"cliente/templates/cartelera.html",
            controller:"carteleraController"
        })
    
        .state('Pelicula',{
            url:"/pelicula/:peliculaID",
            templateUrl: "cliente/templates/pelicula.html",
            controller:"peliculaController",
            
        })
        .state('Reserva',{
            url:"/reserva/:funcionID",
            templateUrl:"cliente/templates/reserva.html",
            controller:"reservaController",
            authenticate:true
        })
        .state('Perfil',{
            url:"/perfil",
            templateUrl:"cliente/templates/perfil.html",
            controller:"perfilController",
            authenticate:true
        })
        .state('Tarifas',{
            url:"/Tarifas",
            templateUrl:"cliente/templates/tarifas.html",
            
        });
        
    });
    
    app.factory('authInterceptor' , function ($rootScope,$q,$cookieStore , $location) {
        return {
            request: function (config) {
                config.headers = config.headers||{};
                if($cookieStore.get('token')){
                    config.headers.Authorization = 'Bearer '+ $cookieStore.get('token');
                }
                return config;
            }
            
        };
    });
    app.run(function ($rootScope, $location, Auth, $state, loginModal) {
        // Redirige al login si la ruta require autenticación
        $rootScope.$on('$stateChangeStart', function (event, next , toParams) {
            Auth.isLoggedInAsync(function (loggedIn) {
                if(next.authenticate && !loggedIn){
                    //$state.transitionTo("Login");
                    event.preventDefault();   
                    
                    loginModal().then(function () {
                        console.log("por el then");
                        console.log("to params" + toParams)
                        return $state.go(next.name, toParams);
                    }).catch(function () {
                        console.log("por el catch")
                        //return $state.go('Home');
                    });
                    
                    
                }
            });
            
        });
    });
}());

