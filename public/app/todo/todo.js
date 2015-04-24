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

            update: function (id, todoData) {
                return $http.put('/api/todos/' + id, todoData);
            },

            delete: function (id) {
                return $http.delete('/api/todos/' + id);
            }
        };
    }
}());
