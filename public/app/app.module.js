(function () {
    /* global angular */
    'use strict';
    angular.module('app', [
        'ngRoute',
        'ngResource',
        'app.core',
        'app.account',
        'app.todo',
        'app.atm'
    ]);
}());
