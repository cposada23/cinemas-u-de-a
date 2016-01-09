
(function () {
    angular.module('cineUdea').service('registroModal', function ($uibModal) {
        return function () {
            var registroModal = $uibModal.open({
                animation:true,
                templateUrl:'cliente/templates/registro2.html',
                controller:'registroController2'
            });
            
            registroModal.result.then(function( ) {
                console.log("Registro cerrado");
            });
            
        }
       
    })
    
   
    
}());
