(function () {
    /* global angular */
    'use strict';

    angular.module('app', ['ngRoute', 'ngResource', 'app.core']);

    angular.module('app')
        .config(config);

    function config($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: '/app/main/main.html',
                controller: 'Controller',
                controllerAs: 'vm'
            })
            .when('/signup', {
                templateUrl: '/app/account/signup.html',
                controller: 'SignupCtrl',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: '/app/account/profile.html',
                controller: 'ProfileCtrl',
                resolve: {
                    show: function (sbIdentity) {

                    }
                },
                controllerAs: 'vm'
            })
            .when('/admin/users', {
                templateUrl: 'app/admin/user-admin.html',
                controller: 'UserAdminCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/edituser', {
                templateUrl: 'app/admin/edit-profile.html',
                controller: 'EditUserCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    angular.module('app.core', []);

}());
