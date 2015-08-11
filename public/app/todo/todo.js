(function () {
    /* global angular: true */
    'use strict';

    angular.module('app.todo')
        .factory('todo', todo);

    todo.$inject = ['$http', 'todoCache'];
    function todo($http, todoCache) {
        return {
            query: function () {
                return todoCache.query();
            },

            create: function (todoData) {
                todoCache.clearCache();
                return $http.post('/api/todos', todoData);
            },

            update: function (id, todoData) {
                todoCache.clearCache();
                return $http.put('/api/todos/' + id, todoData);
            },

            delete: function (id) {
                todoCache.clearCache();
                return $http.delete('/api/todos/' + id);
            }
        };
    }
}());
