'use strict';

/**
 * remueve errores del servidor cuando el usuario actualiza un input
 */

angular.module('cineUdea').directive('mongooseError', function () {
    return{
        restrict:'A',
        require: 'ngModel',
        link:function (scope, element, attrs, ngModel) {
            element.on('keydown', function () {
                return ngModel.$setValidity('mongoose', true);
            });
        }
    };
});

