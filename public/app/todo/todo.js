(function () {
    /* global angular: true */
    'use strict';

    angular.module('app.core')
        .factory('todo', todo);

    function todo($http) {
        return {
            get: function () {
                return $http.get('/api/todos');

            },

            create: function (todoData) {
                return $http.post('/api/todos', todoData);
            },

            delete: function (id) {
                return $http.delete('/api/todos/' + id);
            }
        };
    }
}());
