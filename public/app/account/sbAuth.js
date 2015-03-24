(function () {
    /* global angular:true */
    'use strict';

    angular.module('app.core')
        .factory('sbAuth', sbAuth);

    function sbAuth($http, $q, $window, sbIdentity, sbUser, sbEditUser) {

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

        function updateUser(updatedUserData, isCurrentUser) {
            var deferred = $q.defer();

            var clonedUser = new sbUser();
            if (isCurrentUser) {
                angular.copy(sbIdentity.currentUser, clonedUser);
            } else {
                angular.copy(sbEditUser.userToEdit, clonedUser);
            }
            angular.extend(clonedUser, updatedUserData);

            clonedUser.$update().then(updateUserSuccess, updateUserFailure);

            return deferred.promise;

            ////////////////
            function updateUserSuccess() {
                if (clonedUser._id === sbIdentity.currentUser._id) {
                    sbIdentity.currentUser = clonedUser;
                }
                deferred.resolve();
            }

            function updateUserFailure(response) {
                deferred.reject(response.data.reason);
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
