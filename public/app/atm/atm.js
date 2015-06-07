/**
 * Created by jsjones on 6/2/15.
 */
(function () {
    'use strict';
    angular.module('app.atm')
        .factory('ATM', ATM);

    //////////////
    function ATM($http, $q) {

        var service = {
            getTotalAmount: getTotalAmount,
            query: query,
            getById: getById,
            addTransaction: addTransaction
        };

        return service;

        ////////////////////////
        function getTotalAmount(transaction) {
            return transaction.cashAmount + transaction.serviceFee;
        }

        function query() {
            var deferred = $q.defer();
            var url = '/api/atms';
            $http.get(url)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    deferred.reject('Failed to retrieve the ATM transactions');
                });
            return deferred.promise;
        }

        function getById(id) {
            var deferred = $q.defer();
            var url = '/api/atms/' + id;
            $http.get(url)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    deferred.reject('Failed to get ATM transaction '+ id);
                });
            return deferred.promise;
        }

        function addTransaction(atmData) {
            var deferred = $q.defer();
            var url = '/api/atms';
            $http.post(url, atmData)
                .success(function (transaction) {
                    deferred.resolve(transaction)
                })
                .error(function () {
                    deferred.reject('failed to add transaction');
                });

            return deferred.promise;

        }
    }
})();

