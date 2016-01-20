
(function () {
    angular.module('cineUdea').service('pagoModal', function ($uibModal) {
        return function () {
            var pagoModal = $uibModal.open({
                animation:true,
                templateUrl:'cliente/templates/pago.html',
                controller:'pagoController'
            });
            
            return pagoModal.result.then(function( ) {
                console.log("pago cerrado ");
            });
            
        }
       
    })
    
   
    
}());