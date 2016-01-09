
(function () {
    angular.module('cineUdea').service('loginModal', function ($uibModal) {
        return function () {
            var loginModal = $uibModal.open({
                animation:true,
                templateUrl:'cliente/templates/login2.html',
                controller:'loginController2'
            });
            
            return loginModal.result.then(function( ) {
                console.log("Login cerrado");
            });
            
        }
       
    })
    
   
    
}());