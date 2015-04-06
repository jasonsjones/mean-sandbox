(function () {
    'use strict';

    angular.module('app.core')
        .factory('identity', identity);

    function identity($window, sbUser) {

        var storage = $window.localStorage;
        var currentUser = null;

        if (storage.getItem('currentUser')) {
            var systemUser = JSON.parse(storage.getItem('currentUser'));
            currentUser = new sbUser();
            angular.extend(currentUser, systemUser);
        }

        var service = {
            currentUser: currentUser,
            isAuthenticated: isAuthenticated,
            isAuthorizedForRole: isAuthorizedForRole
        };

        return service;

        //////////////////////////
        function isAuthenticated() {
            return !!this.currentUser;
        }

        function isAuthorizedForRole(role) {
            return this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }

    }
}());
