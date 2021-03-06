(function () {
    'use strict';

    angular.module('app.atm')
        .factory('purchase', purchase);

    purchase.$inject = ['$http', '$q', 'purchaseCache'];
    function purchase($http, $q, purchaseCache) {
        var service = {
            get: get,
            add: add,
            update: update,
            remove: remove,
            removeAllPurchases: removeAllPurchases
        };

        return service;

        /********** Implementation Details *********/
        function get(atmId) {
            return purchaseCache.query(atmId);
        }

        function add(atmId, data) {
            var deferred = $q.defer();
            var url = '/api/atms/' + atmId + '/purchases';

            $http.post(url, data)
                .success(function (newPurchaseData) {
                    deferred.resolve(newPurchaseData);
                    purchaseCache.clearCache(atmId);
                })
                .error(function () {
                    deferred.reject('failed to add new purchase');
                });

            return deferred.promise;
        }

        function update(atmId, purchaseId, data) {
            var deferred = $q.defer();
            var url = '/api/atms/' + atmId + '/purchases/' + purchaseId;

            $http.put(url, data)
                .success(function (response) {
                    deferred.resolve(response);
                    purchaseCache.clearCache(atmId);
                })
                .error(function () {
                    deferred.reject('failed to update purchase id: ' + purchaseId);
                });

            return deferred.promise;
        }

        function remove(atmId, purchaseId) {
            var deferred = $q.defer();
            var url = '/api/atms/' + atmId + '/purchases/' + purchaseId;

            $http.delete(url)
                .success(function (data) {
                    deferred.resolve(data);
                    purchaseCache.clearCache(atmId);
                })
                .error(function () {
                    deferred.reject('failed to delete purchase');
                });

            return deferred.promise;
        }

        function removeAllPurchases(atmId) {
            var deferred = $q.defer();
            var url = '/api/atms/' + atmId + '/purchases';

            $http.delete(url)
                .success(function (data) {
                    deferred.resolve(data);
                    purchaseCache.clearCache(atmId);
                })
                .error(function () {
                    deferred.reject('failed to delete all purchases');
                });

            return deferred.promise;
        }
    }
})();
