(function () {
    /* global angular: true */
    'use strict';

    angular.module('app.core')
        .service('todo', todo);

    function todo($resource) {

        var TodoResource = $resource('/api/todos/:id', {id: '@_id'},
            {
                update: {
                    method: 'PUT',
                    isArray: false
            }
        });

        return TodoResource;
    }
}());
