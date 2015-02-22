(function () {
    'use strict';

    angular.module('app.core')
        .factory('authservice', authservice);

    function authservice($http, $q, $window, identityservice, UserResource) {

        var service = {
            authenticateUser: authenticateUser,
            updateUser: updateUser,
            createUser: createUser
        };

        return service;

        function authenticateUser(username, password) {
            var deferred = $q.defer();
            $http.post('/login', {
                username: username,
                password: password
            }).then(authSuccess);

            return deferred.promise;

            function authSuccess(response) {
                if (response.data.success) {
                    var user = new UserResource();
                    angular.extend(user, response.data.user);
                    identityservice.currentUser = user;
                    $window.localStorage.currentUser = JSON.stringify(user);
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            }
        }

        function createUser(newUserData) {
            console.log(newUserData);
            var newUser = new UserResource(newUserData);

            var deferred = $q.defer();

            newUser.$save().then(newUserSuccess, newUserFailure);

            return deferred.promise;

            ////////////////
            function newUserSuccess(response) {
                identityservice.currentUser = newUser;
                deferred.resolve();
            }

            function newUserFailure(response) {
                deferred.reject(response.data.reason);
            }
        }

        function updateUser(updatedUserData) {
            var deferred = $q.defer();

            var clonedUser = angular.copy(identityservice.currentUser);
            angular.extend(clonedUser, updatedUserData);

            clonedUser.$update().then(function () {
                identityservice.currentUser = clonedUser;
                deferred.resolve();
            }, function (response) {
                deferred.reject(response.data.reason);
            });

            return deferred.promise;
        }

    }
})();
