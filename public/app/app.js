(function () {
    /* global angular */
    'use strict';

    angular.module('app')
        .config(config);

    //=======================
    function config($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        var routeRoleCheck = {
            admin: {
                auth: function (sbAuth) {
                    return sbAuth.authorizeCurrentUserForRoute('admin');
                }
            },
            user : {
                auth: function (sbAuth) {
                    return sbAuth.authorizeAuthenticatedUserForRoute();
                }
            }
        };

        $routeProvider
            .when('/', {
                templateUrl: '/app/main/main.html',
                controller: 'Controller',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: '/app/account/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: '/app/account/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'vm',
                resolve: routeRoleCheck.user
            })
            .when('/about', {
                templateUrl: '/app/main/about.html',
                controller: 'Controller',
                controllerAs: 'vm'
            })
            .when('/contact', {
                templateUrl: '/app/main/contact.html',
                controller: 'Controller',
                controllerAs: 'vm'
            })
            .when('/todos', {
                templateUrl: '/app/todo/todo.html',
                controller: 'TodoCtrl',
                controllerAs: 'vm',
                resolve: routeRoleCheck.user
            })
            .when('/atm', {
                templateUrl: '/app/atm/atm.html',
                controller: 'ATMCtrl',
                controllerAs: 'vm',
                resolve: routeRoleCheck.user
            })
            .when('/new-atm', {
                templateUrl: 'app/atm/atm-new.html',
                controller: 'NewATMCtrl',
                controllerAs: 'vm',
                resolve: routeRoleCheck.user
            })
            .when('/atm-details/:atmId', {
                templateUrl: 'app/atm/atm-details.html',
                controller: 'ATMDetailsCtrl',
                controllerAs: 'vm',
                resolve: routeRoleCheck.user
            })
            .when('/admin/users', {
                templateUrl: 'app/admin/user-admin.html',
                controller: 'UserAdminCtrl',
                controllerAs: 'vm',
                resolve: routeRoleCheck.admin
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

    angular.module('app')
        .run(function($rootScope, $location) {
            $rootScope.$on('$routeChangeError', handleRouteChangeError);

            function handleRouteChangeError(evt, current, previous, rejection) {
                if (rejection === 'not authorized') {
                    $location.path('/');
                }
            }
        });

}());
