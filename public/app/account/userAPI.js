(function () {
    /* global angular: true */
    'use strict';

    angular.module('app.account')
        .factory('userAPI', userAPI);

    function userAPI($http) {

        return {
           get: function () {
               return $http.get('/api/users');
           },

           create: function (newUserData) {
               return $http.post('/api/users', newUserData);
           },

           update: function (id, data) {
               return $http.put('/api/users/' + id, data);
           },

           remove: function (id) {
               return $http.delete('/api/users/' + id);
           }
        };
    }
}());
