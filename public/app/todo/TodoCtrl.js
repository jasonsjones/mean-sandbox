(function () {
    'use strict';
    angular.module('app.todo')
        .controller('TodoCtrl', TodoCtrl);

    ////////////////////////
    function TodoCtrl(todo) {
        console.log('TodoCtrl loaded...');

        var vm = this;
        vm.loading = true;
        vm.todos = null;
        vm.numberOfTodos = null;

        initialize();

        vm.createTodo = function () {
            console.log('createTodo fired...');
            vm.loading = true;
            todo.create(vm.formData).success(function (data) {
                vm.formData = {};
                vm.todos = data;
                vm.numberOfTodos = updateNumberOfTodos();
                vm.loading = false;
            });
        };

        vm.deleteTodo = function (id) {
            console.log('deleteTodo fired');

            vm.loading = true;
            todo.delete(id).success(function (data) {
                console.log('todo deleted...');
                vm.todos = data;
                vm.numberOfTodos = updateNumberOfTodos();
                vm.loading = false;
            });

        };

        vm.completeTodo = function (todoToUpdate) {
            todoToUpdate.done = !todoToUpdate.done;
            todo.update(todoToUpdate._id, todoToUpdate)
            .success(function (data) {
                vm.todos = data;
                vm.numberOfTodos = updateNumberOfTodos();
            });
        };

        function initialize() {
            todo.get().success(function (data) {
                vm.todos = data;
                vm.loading = false;
                vm.numberOfTodos = updateNumberOfTodos();
            });
        }

        function updateNumberOfTodos(argument) {
            var result = 0;
            vm.todos.forEach(function (todo) {
                if (!todo.done) {
                    result++;
                }
            });
            if (result === 1) {
                vm.jumbotronLabel = "Thing to do";
            } else {
                vm.jumbotronLabel = "Things to do";
            }
            return result;
        }
    }
}());
