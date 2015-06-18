(function () {
    'use strict';
    angular.module('app.atm')
        .factory('purchase', purchase);

    ////////////////
    function purchase($http, $q) {
        var service = {
            get: get,
            add: add,
            remove: remove,
            removeAllPurchases: removeAllPurchases
        };

        return service;

        function get(atmId) {
            var deferred = $q.defer();
            var url = '/api/atms/' + atmId + '/purchases';

            $http.get(url)
                .success(function (purchases) {
                    deferred.resolve(purchases);
                })
                .error(function () {
                   deferred.reject('failed to get purchases');
                });
            return deferred.promise;
        }

        function add(atmId, data) {
            var deferred = $q.defer();
            var url = '/api/atms/' + atmId + '/purchases';

            $http.post(url, data)
                .success(function (newPurchaseData) {
                    deferred.resolve(newPurchaseData);
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
                   deferred.resolve(response)
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
                })
                .error(function () {
                    deferred.reject('failed to delete all purchases');
                });

            return deferred.promise;
        }
    }
})();