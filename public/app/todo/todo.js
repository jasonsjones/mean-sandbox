(function () {
    /* global angular: true */
    'use strict';

    angular.module('app.todo')
        .factory('todo', todo);

    todo.$inject = ['$http', '$q', 'todoCache'];
    function todo($http, $q, todoCache) {
        return {
            query: function () {
                return todoCache.query();
            },

            create: function (todoData) {
                var deferred = $q.defer();
                $http.post('/api/todos', todoData)
                    .success(function (data) {
                        deferred.resolve(data);
                        todoCache.clearCache();
                    })
                    .error(function () {
                        deferred.reject('failed to create todo');
                    });
                return deferred.promise;
            },

            update: function (id, todoData) {
                var deferred = $q.defer();
                todoCache.clearCache();
                $http.put('/api/todos/' + id, todoData)
                    .success(function (data) {
                        deferred.resolve(data);
                        todoCache.clearCache();
                    })
                    .error(function () {
                        deferred.reject('failed to update todo');
                    });
                return deferred.promise;
            },

            delete: function (id) {
                var deferred = $q.defer();
                $http.delete('/api/todos/' + id)
                    .success(function (data) {
                        deferred.resolve(data);
                        todoCache.clearCache();

                    })
                    .error(function () {
                        deferred.reject('failed to delete todo');
                    });
                return deferred.promise;
            }
        };
    }
}());
