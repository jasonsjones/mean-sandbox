(function () {
    'use strict';

    angular.module('app.account')
        .factory('identity', identityFactory);

    identityFactory.$inject = ['$window', '$http', '$q'];
    function identityFactory($window, $http, $q) {

        var storage = $window.sessionStorage;
        var currentUser = null;

        if (storage.getItem('currentUser')) {
            var systemUser = JSON.parse(storage.getItem('currentUser'));
            currentUser = systemUser;
        }

        var service = {
            currentUser: currentUser,
            isAuthenticated: isAuthenticated,
            isAuthorizedForRole: isAuthorizedForRole,
            getCurrentUserFromServer: getCurrentUserFromServer
        };

        return service;

        /********* Implementation Details **********/
        function isAuthenticated() {
            return !!this.currentUser;
        }

        function isAuthorizedForRole(role) {
            return this.isAuthenticated() && this.currentUser.roles.indexOf(role) > -1;
        }

        function getCurrentUserFromServer() {
            var deferred = $q.defer();
            $http.get('/api/user/current')
                .success(authSuccess);
            return deferred.promise;

            /////////////
            function authSuccess(data) {
                if (data.success) {
                    var user = data.user;
                    currentUser = user;
                    storage.currentUser = JSON.stringify(user);
                    deferred.resolve(user);
                } else {
                    deferred.resolve(false);
                }
            }
        }
    }
}());
