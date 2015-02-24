(function () {
    'use strict';

    angular.module('app.core')
        .service('UserResource', UserResource);

    function UserResource($resource) {
        var UserResrc = $resource('/api/users/:_id', {_id: "@id"},
            { update: {
                method: 'PUT',
                isArray: false
            }
        });

        UserResrc.prototype.isAdmin = function () {
            return this.roles && this.roles.indexOf('admin') > -1;
        };


        return UserResrc;
    }
}());
