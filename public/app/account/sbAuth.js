(function () {
    /* global angular:true */
    'use strict';

    angular.module('app.account')
        .factory('sbAuth', sbAuth);

    sbAuth.$inject = ['$http', '$q', '$window', 'identity'];
    function sbAuth($http, $q, $window, identity) {

        var service = {
            authenticateUser: authenticateUser,
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
    }

}());
