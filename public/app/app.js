(function () {
    /* global angular */
    'use strict';

    angular.module('app')
        .config(config);

    //=======================
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        var routeRoleCheck = {
            admin: {
                auth: ['sbAuth', function (sbAuth) {
                    return sbAuth.authorizeCurrentUserForRoute('admin');
                }]
            },
            user : {
                auth: ['sbAuth', function (sbAuth) {
                    return sbAuth.authorizeAuthenticatedUserForRoute();
                }]
            }
        };

        $routeProvider
            .when('/', {
                templateUrl: 'app/main/main.html',
                controller: 'Controller',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: 'app/account/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: 'app/account/login.html',
                controller: 'NavBarLoginController',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: 'app/account/profile.html',
                controller: 'ProfileController',
                controllerAs: 'vm',
                resolve: routeRoleCheck.user
            })
            .when('/about', {
                templateUrl: 'app/main/about.html',
                controller: 'Controller',
                controllerAs: 'vm'
            })
            .when('/contact', {
                templateUrl: 'app/main/contact.html',
                controller: 'MailCtrl',
                controllerAs: 'vm'
            })
            .when('/todos', {
                templateUrl: 'app/todo/todo.html',
                controller: 'TodoController',
                controllerAs: 'vm',
                resolve: routeRoleCheck.user
            })
            .when('/atm', {
                templateUrl: 'app/atm/atm.html',
                controller: 'ATMController',
                controllerAs: 'vm',
                resolve: routeRoleCheck.user
            })
            .when('/new-atm', {
                templateUrl: 'app/atm/atm-new.html',
                controller: 'NewATMController',
                controllerAs: 'vm',
                resolve: routeRoleCheck.user
            })
            .when('/atm-details/:atmId', {
                templateUrl: 'app/atm/atm-details.html',
                controller: 'ATMDetailsController',
                controllerAs: 'vm',
                resolve: routeRoleCheck.user
            })
            .when('/admin/users', {
                templateUrl: 'app/admin/user-admin.html',
                controller: 'UserAdminController',
                controllerAs: 'vm',
                resolve: routeRoleCheck.admin
            })
            .when('/admin/users/:userId', {
                templateUrl: 'app/admin/user-details.html',
                controller: 'UserDetailsController',
                controllerAs: 'vm',
                resolve: routeRoleCheck.admin
            })
            .when('/admin/users-grid', {
                templateUrl: 'app/admin/user-grid.html',
                controller: 'UserAdminController',
                controllerAs: 'vm',
                resolve: routeRoleCheck.admin
            })
            .when('/admin/edituser/:userId', {
                templateUrl: 'app/admin/edit-profile.html',
                controller: 'EditUserController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    angular.module('app')
        .run(runFunction);

    runFunction.$inject = ['$rootScope', '$location'];
    function runFunction($rootScope, $location) {
        $rootScope.$on('$routeChangeError', handleRouteChangeError);

        function handleRouteChangeError(evt, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/');
            }
        }
    }
}());
