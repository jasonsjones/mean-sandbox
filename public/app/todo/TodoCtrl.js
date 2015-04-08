(function () {
    'use strict';
    angular.module('app.core')
        .controller('TodoCtrl', TodoCtrl);

    ////////////////////////
    function TodoCtrl(todo) {
        console.log('TodoCtrl loaded...');

        var vm = this;

        vm.todos = todo.query();

        vm.createTodo = function () {
            console.log('createTodo fired...');
            console.log(vm.formData);
        };

        vm.deleteTodo = function (id) {
            console.log('deleteTodo fired');
        };
    }
}());
