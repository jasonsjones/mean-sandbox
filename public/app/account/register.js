(function () {
    /* global angular:true */
    'use strict';

    angular.module('app.account')
        .factory('register', register);

    register.$inject = ['$http', '$q', '$window', 'userCache', 'identity'];
    function register($http, $q, $window, userCache, identity) {
        var storage = $window.sessionStorage;
        var service = {
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser
        };

        return service;

        /************* implementation details *************/
        function createUser(newUserData) {
            var deferred = $q.defer();

            $http.post('/api/users', newUserData)
                .success(function (data) {
                    if (data.success) {
                        var user = data.user;
                        identity.currentUser = user;
                        storage.currentUser = JSON.stringify(user);
                        userCache.usersChanged();
                        deferred.resolve(user);
                    }
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function deleteUser(userToDelete) {
            var deferred = $q.defer();

            $http.delete('/api/users/' + userToDelete._id)
                .success(function (data) {
                    console.log(data);
                    userCache.usersChanged();
                    deferred.resolve(data);
                });

            return deferred.promise;
        }

        function updateUser(id, updatedUserData) {
            var deferred = $q.defer();

            $http.put('/api/users/' + id, updatedUserData)
                .success(function (user) {
                    if (id === identity.currentUser._id) {
                        identity.currentUser = user;
                        storage.currentUser = JSON.stringify(user);
                    }
                    userCache.usersChanged();
                    deferred.resolve();
                })
                .error(function (response) {
                    deferred.reject(response.data.reason);
                });

            return deferred.promise;
        }
    }
}());
