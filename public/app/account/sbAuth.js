(function () {
    /* global angular:true */
    'use strict';

    angular.module('app.account')
        .factory('sbAuth', sbAuth);

    sbAuth.$inject = ['$http', '$q', '$window', 'identity'];
    function sbAuth($http, $q, $window, identity) {

        var service = {
            authenticateUser: authenticateUser,
            authenticateUserWithTwitter: authenticateUserWithTwitter,
            authorizeCurrentUserForRoute: authorizeCurrentUserForRoute,
            authorizeAuthenticatedUserForRoute: authorizeAuthenticatedUserForRoute,
            getCurrentUserFromServer: getCurrentUserFromServer,
            signOutUser: signOutUser
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

            /////////////
            function authSuccess(response) {
                if (response.data.success) {
                    var user = response.data.user;
                    identity.currentUser = user;
                    $window.sessionStorage.currentUser = JSON.stringify(user);
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            }
        }

        function authenticateUserWithTwitter() {
            $window.location.href = '/auth/twitter';
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
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }

        function getCurrentUserFromServer() {
            var deferred = $q.defer();
            if (!identity.currentUser) {
                console.log('user is not logged in on client');
                $http.get('/api/user/current')
                    .success(authSuccess);
            } else {
                deferred.resolve(false);
            }
            return deferred.promise;

            /////////////
            function authSuccess(data) {
                if (data.success) {
                    var user = data.user;
                    identity.currentUser = user;
                    $window.sessionStorage.currentUser = JSON.stringify(user);
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            }
        }

        function signOutUser() {
            var deferred = $q.defer();
            $http.get('/api/user/signout')
                .success(function (success) {
                    deferred.resolve(true);
                });
            return deferred.promise;
        }
    }

}());
