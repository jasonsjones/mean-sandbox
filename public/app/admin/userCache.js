(function () {
    'use strict';

    angular.module('app.core')
        .factory('userCache', userCache);

    function userCache($http, $q) {
        var cachedUsers = null;

        var factory = {
            query: query,
            usersChanged: usersChanged
        };

        return factory;

        /*************** Implementation Details ******************/
        function query() {
            var deferred = $q.defer();
            if (cachedUsers) {
                console.log('getting users from cache...');
                deferred.resolve(cachedUsers);
            } else {
                console.log('hitting the back end to get clean list of users');
                $http.get('/api/users').success(function (users) {
                    cachedUsers = users;
                    deferred.resolve(users);
                });
            }

            return deferred.promise;
        }

        function usersChanged() {
            cachedUsers = null;
        }


    }
}());