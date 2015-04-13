(function () {
    /* global angular:true */
    'use strict';

    angular.module('app.core')
        .factory('register', register);

    function register($q, userAPI, identity, $window) {
        var service = {
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser
        };

        return service;

        /************* implementation details *************/
        function createUser(newUserData) {
            var deferred = $q.defer();

            userAPI.create(newUserData)
            .success(function (user) {
                identity.currentUser = user;
                $window.localStorage.currentUser = JSON.stringify(user);
                deferred.resolve();
            })
            .error(function (response) {
                deferred.reject(response.data.reason);
            });

            return deferred.promise;
        }

        function deleteUser(userToDelete) {
            var deferred = $q.defer();

            userAPI.remove(userToDelete._id)
            .success(function (data) {
                console.log(data);
                deferred.resolve(data);
            });

            return deferred.promise;
        }

        function updateUser(id, updatedUserData) {
            var deferred = $q.defer();

            userAPI.update(id, updatedUserData)
            .success(function (user) {
                if (id === identity.currentUser._id) {
                    identity.currentUser = user;
                    $window.localStorage.currentUser = JSON.stringify(user);
                }
                deferred.resolve();
            })
            .error(function (response) {
                deferred.reject(response.data.reason);
            });

            return deferred.promise;
        }
    }
}());
