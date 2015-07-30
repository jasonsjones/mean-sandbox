(function () {
    'use strict';

    angular.module('app.account')
        .factory('identity', identityFactory);

    identityFactory.$inject = ['$window'];
    function identityFactory($window) {

        var storage = $window.sessionStorage;
        var currentUser = null;

        if (storage.getItem('currentUser')) {
            var systemUser = JSON.parse(storage.getItem('currentUser'));
            currentUser = systemUser;
        }

        var service = {
            currentUser: currentUser,
            isAuthenticated: isAuthenticated,
            isAuthorizedForRole: isAuthorizedForRole
        };

        return service;

        /********* Implementation Details **********/
        function isAuthenticated() {
            return !!this.currentUser;
        }

        function isAuthorizedForRole(role) {
            return this.isAuthenticated() && this.currentUser.roles.indexOf(role) > -1;
        }
    }
}());
