(function () {
    'use strict';

    angular.module('app.core')
        .factory('sbAuth', sbAuth);

    function sbAuth($http, $q, $window, sbIdentity, sbUser) {

        var service = {
            authenticateUser: authenticateUser,
            updateUser: updateUser,
            createUser: createUser,
            authorizeCurrentUserForRoute: authorizeCurrentUserForRoute,
            authorizeAuthenticatedUserForRoute: authorizeAuthenticatedUserForRoute
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
                    var user = new sbUser();
                    angular.extend(user, response.data.user);
                    sbIdentity.currentUser = user;
                    $window.localStorage.currentUser = JSON.stringify(user);
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            }
        }

        function createUser(newUserData) {
            console.log(newUserData);
            var newUser = new sbUser(newUserData);

            var deferred = $q.defer();

            newUser.$save().then(newUserSuccess, newUserFailure);

            return deferred.promise;

            ////////////////
            function newUserSuccess(response) {
                sbIdentity.currentUser = newUser;
                deferred.resolve();
            }

            function newUserFailure(response) {
                deferred.reject(response.data.reason);
            }
        }

        function updateUser(updatedUserData) {
            var deferred = $q.defer();

            var clonedUser = angular.copy(sbIdentity.currentUser);
            angular.extend(clonedUser, updatedUserData);

            clonedUser.$update().then(function () {
                sbIdentity.currentUser = clonedUser;
                deferred.resolve();
            }, function (response) {
                deferred.reject(response.data.reason);
            });

            return deferred.promise;
        }

        function authorizeAuthenticatedUserForRoute() {
            if (sbIdentity.isAuthenticated()) {
               return true;
            } else {
                return $q.reject('not authorized');
            }
        }

        function authorizeCurrentUserForRoute(role) {

            if (sbIdentity.isAuthorizedForRole(role)) {
                console.log('user is authorized for role: ' + role);
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    }

}());
