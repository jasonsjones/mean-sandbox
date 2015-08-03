(function () {
    'use strict';

    angular.module('app.todo')
        .factory('todoCache', todoCache);

    todoCache.$inject = ['$http', '$q'];
    function todoCache($http, $q) {
        var cachedTodos = null;

        var factory = {
            query: query,
            todosChanged: todosChanged
        };

        return factory;

        /*************** Implementation Details ******************/
        function query() {
            var deferred = $q.defer();
            if (cachedTodos) {
                console.log('getting TODOs from cache...');
                deferred.resolve(cachedTodos);
            } else {
                console.log('hitting the back end to get clean list of TODOs');
                $http.get('/api/todos').success(function (todos) {
                    cachedTodos = todos;
                    deferred.resolve(todos);
                });
            }

            return deferred.promise;
        }

        function todosChanged() {
            cachedTodos = null;
        }
    }
}());
