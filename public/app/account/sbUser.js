(function () {
    'use strict';

    angular.module('app.core')
        .service('sbUser', sbUser);

    function sbUser($resource) {

        var User = $resource('/api/users/:id', {id: "@_id"},
            { update: {
                method: 'PUT',
                isArray: false
            }
        });

        User.prototype.isAdmin = function () {
            return this.roles && this.roles.indexOf('admin') > -1;
        };


        return User;
    }
}());
