(function () {
    'use strict';

    angular.module('app.core')
        .factory('mailer', mailer);

    mailer.$inject = ['$http', '$q'];
    function mailer($http, $q) {
        var service = {
            sendContactEmail: sendContactEmail
        };

        return service;

        /********** Implementation Details **********/
        function sendContactEmail(mailPayload) {
            var deferred = $q.defer();
            var url = '/api/contactemail';
            $http.post(url, mailPayload)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    console.log('error in mail service');
                    deferred.reject();
                });
            return deferred.promise;
        }
    }

}());
