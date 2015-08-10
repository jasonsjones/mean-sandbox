(function () {
    'use strict';
    angular.module('app.atm')
        .factory('ATM', ATM);

    ATM.$inject = ['$http', '$q', 'atmCache'];
    function ATM($http, $q, atmCache) {

        var service = {
            getTotalAmount: getTotalAmount,
            query: query,
            getById: getById,
            addTransaction: addTransaction,
            deleteTransaction: deleteTransaction
        };

        return service;

        /********** Implementation Details *********/
        function getTotalAmount(transaction) {
            return transaction.cashAmount + transaction.serviceFee;
        }

        function query() {
            return atmCache.query();
        }

        function getById(id) {
            return atmCache.getATMById(id);
        }

        function addTransaction(atmData) {
            var deferred = $q.defer();
            var url = '/api/atms';
            $http.post(url, atmData)
                .success(function (transaction) {
                    deferred.resolve(transaction);
                    atmCache.atmChanged();
                })
                .error(function () {
                    deferred.reject('failed to add transaction');
                });

            return deferred.promise;
        }

        function deleteTransaction(id) {
            var deferred = $q.defer();
            var url = '/api/atms/' + id;
            $http.delete(url)
                .success(function (data) {
                    deferred.resolve(data);
                    atmCache.atmChanged();
                })
                .error(function () {
                    deferred.reject('failed to delete transaction');
                });
            return deferred.promise;
        }
    }
}());

