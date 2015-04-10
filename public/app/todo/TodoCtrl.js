(function () {
    'use strict';
    angular.module('app.core')
        .controller('TodoCtrl', TodoCtrl);

    ////////////////////////
    function TodoCtrl(todo, $route) {
        console.log('TodoCtrl loaded...');

        var vm = this;

        vm.todos = todo.query();

        vm.createTodo = function () {
            console.log('createTodo fired...');
            console.log(vm.formData);
        };

        vm.deleteTodo = function (todo) {
            console.log('deleteTodo fired');

            todo.$delete().then(function (err) {
                if (err) {
                    console.log(err);
                }
                console.log('todo deleted...');
                $route.reload();
            });

        };
    }
}());
