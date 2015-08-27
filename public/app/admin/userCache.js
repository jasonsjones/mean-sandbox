(function () {
    'use strict';

    angular.module('app.core')
        .factory('userCache', userCache);

    userCache.$inject = ['$http', '$q'];
    function userCache($http, $q) {
        var cachedUsers = null;
        var cachedUsersById = {};

        var factory = {
            query: query,
            getUserById: getUserById,
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
                    populateUserById();
                });
            }

            return deferred.promise;
        }

        function getUserById(userId) {
            return cachedUsersById[userId];
        }

        function usersChanged() {
            cachedUsers = null;
        }

        function populateUserById() {
            cachedUsers.forEach(function (user) {
                cachedUsersById[user._id] = user;
            });
        }
    }
}());
