(function () {
    'use strict';
    angular.module('app.atm')
        .factory('purchase', purchase);

    ////////////////
    function purchase($http) {
        var service = {
            get: function(id) {
                return $http.get('api/atms/' + id + '/purchases');
            }
        };
        return service;
    }
})();