(function () {
    'use strict';
    angular.module('app.core')
        .factory('sbEditUser', sbEditUser);

    function sbEditUser() {
        var userToEdit = {
            firstName: 'Default',
            lastName: 'User',
            email: 'user@domain.com',
            username: 'default'
        };

        return {
            userToEdit: userToEdit
        };
    }
}());
