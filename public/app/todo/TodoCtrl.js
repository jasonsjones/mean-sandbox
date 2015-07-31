(function () {
    'use strict';
    angular.module('app.todo')
        .controller('TodoCtrl', TodoCtrl);

    TodoCtrl.$inject = ['todo', 'notifier'];
    function TodoCtrl(todo, notifier) {

        var vm = this;
        vm.loading = true;
        vm.todos = [];
        vm.numberOfTodos = 0;
        vm.jumbotronLabel = '';

        vm.createTodo = createTodo;
        vm.deleteTodo = deleteTodo;
        vm.completeTodo = completeTodo;

        initialize();

        /************* Implementation Details **************/
        function initialize() {
            todo.get().success(function (data) {
                vm.todos = data;
                vm.loading = false;
                vm.numberOfTodos = updateNumberOfTodos();
            });
        }

        function createTodo() {
            if (!vm.formData) {
                notifier.error('You must enter text for the todo');
                console.log('must enter text for the todo...');
            } else {
                vm.loading = true;
                todo.create(vm.formData).success(function (data) {
                    vm.formData = {};
                    vm.todos = data;
                    vm.numberOfTodos = updateNumberOfTodos();
                    vm.loading = false;
                });
            }
        }

        function deleteTodo (id) {
            vm.loading = true;
            todo.delete(id).success(function (data) {
                console.log('todo deleted...');
                vm.todos = data;
                vm.numberOfTodos = updateNumberOfTodos();
                vm.loading = false;
            });

        }

        function completeTodo(todoToUpdate) {
            todoToUpdate.done = !todoToUpdate.done;
            todo.update(todoToUpdate._id, todoToUpdate)
            .success(function (data) {
                vm.todos = data;
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
                vm.jumbotronLabel = 'Thing to do';
            } else {
                vm.jumbotronLabel = 'Things to do';
            }
            return result;
        }
    }
}());
