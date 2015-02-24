(function () {
    /* jshint validthis: true */
    'use strict';

    angular.module('app.core')
        .factory('identityservice', identityservice);

    function identityservice($window, UserResource) {

        var currentUser = null;

        if ($window.localStorage.currentUser) {
            var systemUser = JSON.parse($window.localStorage.currentUser);
            currentUser = new UserResource();
            angular.extend(currentUser, systemUser);
            console.log(currentUser);
        }

        var service = {
            currentUser: currentUser,
            isAuthenticated: isAuthenticated
        };

        return service;

        //////////////////////////
        function isAuthenticated() {
            return !!this.currentUser;
        }
    }
}());
