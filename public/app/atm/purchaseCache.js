(function () {
    'use strict';

    angular.module('app.atm')
        .factory('purchaseCache', purchaseCache);

    purchaseCache.$inject = ['$http', '$q'];
    function purchaseCache($http, $q) {
        var cachedPurchases = {};

        var factory = {
            query: query,
            purchasesChanged: purchasesChanged
        };

        return factory;

        /*************** Implementation Details ******************/
        function query(atmId) {
            var deferred = $q.defer();
            if (cachedPurchases[atmId]) {
                console.log('getting purchases from cache for atmId ' + atmId);
                deferred.resolve(cachedPurchases[atmId]);
            } else {
                console.log('hitting the backend to get clean list of purchase for atm ' + atmId);

                var url = '/api/atms/' + atmId + '/purchases';

                $http.get(url)
                    .success(function (purchases) {
                        cachedPurchases[atmId] = purchases;
                        deferred.resolve(cachedPurchases[atmId]);
                    })
                    .error(function () {
                       deferred.reject('failed to get purchases');
                    });
            }
            return deferred.promise;

        }

        function purchasesChanged(atmId) {
            console.log('purchases for atmId ' + atmId + ' has changed');
            cachedPurchases[atmId] = null;
        }
    }
}());
