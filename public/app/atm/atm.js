/**
 * Created by jsjones on 6/2/15.
 */
(function () {
    'use strict';
    angular.module('app.atm')
        .factory('ATM', ATM);

    //////////////
    function ATM() {
        var data = [
            {
              "idx" : 0,
              "cashAmount" : 40,
              "serviceFee" : 3,
              "date" : "6/10/2014",
              "purchases" : [
                {"amount": 3, "description": "ATM service fee"},
                {"amount": 5, "description": "lunch"},
                {"amount": 2, "description": "shaving cream"},
                {"amount": 2, "description": "groceries"},
                {"amount": 6, "description": "coffee dues"},
                {"amount": 6, "description": "lunch"},
                {"amount": 11, "description": "lunch"},
                {"amount": 1, "description": "tip"},
                {"amount": 5, "description": "lunch"}
              ]
            },
            {
            "idx" : 1,
            "cashAmount": 60,
            "serviceFee": 3,
            "date" : "6/3/2014",
            "purchases" : [
                {"amount": 3, "description": "ATM service fee"},
                {"amount": 5, "description": "lunch"},
                {"amount": 6, "description": "coffee dues"}
            ]
        },
            {
            "idx" : 2,
            "cashAmount": 80,
            "serviceFee": 2,
            "date" : "7/3/2014",
            "purchases" : [
                {"amount": 2, "description": "ATM service fee"},
                {"amount": 5, "description": "lunch"},
                {"amount": 20, "description": "groceries"},
                {"amount": 6, "description": "coffee dues"},
                {"amount": 6, "description": "dinner"}
            ]
        }
        ];

        var service = {
            getTransactions: getTransactions,
            getTotalAmount: getTotalAmount
        };

        return service;

        ////////////////////////
        function getTransactions() {
            return data;
        }

        function getTotalAmount(transaction) {
            return transaction.cashAmount + transaction.serviceFee;
        }
    }
})();

