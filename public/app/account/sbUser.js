(function () {
    /* global angular: true */
    'use strict';

    angular.module('app.account')
        .service('sbUser', sbUser);

    sbUser.$inject = ['$resource'];
    function sbUser($resource) {

        var UserResource = $resource('/api/users/:id', {id: '@_id'},
            {
                update: {
                    method: 'PUT',
                    isArray: false
            }
        });

        UserResource.prototype.isAdmin = function () {
            return this.roles && this.roles.indexOf('admin') > -1;
        };

        return UserResource;
    }
}());
