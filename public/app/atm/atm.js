/**
 * Created by jsjones on 6/2/15.
 */
(function () {
    'use strict';
    angular.module('app.atm')
        .factory('ATM', ATM);

    //////////////
    function ATM($http) {

        var service = {
            getTotalAmount: getTotalAmount,
            get: function () {
                return $http.get('/api/atms');
            },
            getById: function (id) {
                return $http.get('/api/atms/' + id);
            }
        };

        return service;

        ////////////////////////
        function getTotalAmount(transaction) {
            return transaction.cashAmount + transaction.serviceFee;
        }
    }
})();

