(function () {
    'use strict';

    angular.module('app.core')
        .factory('sbIdentity', sbIdentity);

    function sbIdentity($window, sbUser) {

        var currentUser = null;

        if ($window.localStorage.currentUser) {
            var systemUser = JSON.parse($window.localStorage.currentUser);
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

    } }());
