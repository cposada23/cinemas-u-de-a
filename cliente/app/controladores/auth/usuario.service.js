'use strict';

angular.module('cineUdea').factory('Usuario', function ($resource) {
    return $resource('/api/usuario/:id/:controller', {
        id : '@_id'
    },{
        changePassword:{
            method:'PUT',
            params:{
                controller: 'password'
            }
        },
        get:{
            method:'GET',
            params:{
                id:'me'
            }
        }
    });
});