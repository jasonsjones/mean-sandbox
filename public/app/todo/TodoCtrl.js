(function () {
    'use strict';
    angular.module('app.core')
        .controller('TodoCtrl', TodoCtrl);

    ////////////////////////
    function TodoCtrl() {
        console.log('TodoCtrl loaded...');

        var vm = this;

        vm.createTodo = function () {
            console.log('createTodo fired...');
        };
    }
}());
