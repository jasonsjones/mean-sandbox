(function () {
    'use strict';
    angular.module('app.atm')
        .factory('purchase', purchase);

    ////////////////
    function purchase($http, $q) {
        var service = {
            get: get
        };

        return service;

        function get(id) {
            var deferred = $q.defer();
            var url = '/api/atms/' + id + '/purchases';

            $http.get(url)
                .success(function (purchases) {
                    deferred.resolve(purchases);
                })
                .error(function () {
                   deferred.reject('failed to get purchases');
                });
            return deferred.promise;
        }
    }
})();