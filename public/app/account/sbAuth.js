(function () {
    /* global angular:true */
    'use strict';

    angular.module('app.core')
        .factory('sbAuth', sbAuth);

    function sbAuth($http, $q, $window, identity, sbUser, sbEditUser, moduser) {

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
                    //var user = new sbUser();
                    //angular.extend(user, response.data.user);
                    var user = response.data.user;
                    identity.currentUser = user;
                    $window.localStorage.currentUser = JSON.stringify(user);
                    deferred.resolve(true);
                    console.log('logged in user: ');
                    console.log(user);
                } else {
                    deferred.resolve(false);
                }
            }
        }

        function createUser(newUserData) {
            //var newUser = new sbUser(newUserData);

            var deferred = $q.defer();

            //newUser.$save().then(newUserSuccess, userFailure);
            moduser.create(newUserData).success(function (user) {
                identity.currentUser = user;
                deferred.resolve();
            })
            .error(userFailure);

            return deferred.promise;

            ////////////////
            // function newUserSuccess(response) {
            //     identity.currentUser = newUser;
            //     deferred.resolve();
            // }

            function userFailure(response) {
                deferred.reject(response.data.reason);
            }
        }

        function updateUser(id, updatedUserData) {
            var deferred = $q.defer();

            // var clonedUser = new sbUser();
            // if (isCurrentUser) {
            //     angular.copy(identity.currentUser, clonedUser);
            // } else {
            //     angular.copy(sbEditUser.userToEdit, clonedUser);
            // }
            // angular.extend(clonedUser, updatedUserData);

            // clonedUser.$update().then(updateUserSuccess, userFailure);

            moduser.update(id, updatedUserData).success(function (user) {
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

            ////////////////
            // function updateUserSuccess() {
            //     if (id === identity.currentUser._id) {
            //         identity.currentUser = clonedUser;
            //     }
            //     deferred.resolve();
            // }

            // function userFailure(response) {
            //     deferred.reject(response.data.reason);
            // }
        }

        function deleteUser(userToDelete) {
            var deferred = $q.defer();

            // userToDelete.$delete().then(function () {
            //     deferred.resolve();
            // });
            moduser.remove(userToDelete._id).success(function (data) {
               console.log(data);
               deferred.resolve(data);
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
    }

}());
