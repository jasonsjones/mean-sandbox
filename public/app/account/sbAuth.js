(function () {
    /* global angular:true */
    'use strict';

    angular.module('app.core')
        .factory('sbAuth', sbAuth);

    function sbAuth($http, $q, $window, identity, sbUser, sbEditUser) {

        var service = {
            authenticateUser: authenticateUser,
            updateUser: updateUser,
            createUser: createUser,
            deleteUser: deleteUser,
            authorizeCurrentUserForRoute: authorizeCurrentUserForRoute,
            authorizeAuthenticatedUserForRoute: authorizeAuthenticatedUserForRoute
        };

        return service;

        /************* implementation details *************/
        function authenticateUser(username, password) {
            var deferred = $q.defer();
            $http.post('/login', {
                username: username,
                password: password
            }).then(authSuccess);

            return deferred.promise;

            /////////////////////////
            function authSuccess(response) {
                if (response.data.success) {
                    var user = new sbUser();
                    angular.extend(user, response.data.user);
                    identity.currentUser = user;
                    $window.localStorage.currentUser = JSON.stringify(user);
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            }
        }

        function createUser(newUserData) {
            var newUser = new sbUser(newUserData);

            var deferred = $q.defer();

            newUser.$save().then(newUserSuccess, userFailure);

            return deferred.promise;

            ////////////////
            function newUserSuccess(response) {
                identity.currentUser = newUser;
                deferred.resolve();
            }
        }

        function updateUser(updatedUserData, isCurrentUser) {
            var deferred = $q.defer();

            var clonedUser = new sbUser();
            if (isCurrentUser) {
                angular.copy(identity.currentUser, clonedUser);
            } else {
                angular.copy(sbEditUser.userToEdit, clonedUser);
            }
            angular.extend(clonedUser, updatedUserData);

            clonedUser.$update().then(updateUserSuccess, userFailure);

            return deferred.promise;

            ////////////////
            function updateUserSuccess() {
                if (clonedUser._id === identity.currentUser._id) {
                    identity.currentUser = clonedUser;
                }
                deferred.resolve();
            }
        }

        function deleteUser(userToDelete) {
            var deferred = $q.defer();

            userToDelete.$delete().then(function () {
                deferred.resolve();
            });

            return deferred.promise;
        }

        function authorizeAuthenticatedUserForRoute() {
            if (identity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }

        function authorizeCurrentUserForRoute(role) {

            if (identity.isAuthorizedForRole(role)) {
                console.log('user is authorized for role: ' + role);
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }

        function userFailure(response) {
            deferred.reject(response.data.reason);
        }
    }

}());
