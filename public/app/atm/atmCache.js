(function () {
    'use strict';

    angular.module('app.atm')
        .factory('atmCache', atmCache);

    atmCache.$inject = ['$http', '$q'];
    function atmCache($http, $q) {
        var cachedATMs = null;
        var cachedATMsById = {};

        var factory = {
            query: query,
            getATMById: getATMById,
            clearCache: clearCache
        };

        return factory;

        /*************** Implementation Details ******************/
        function query() {
            var deferred = $q.defer();

            if (cachedATMs) {
                console.log('getting ATMs from cache...');
                deferred.resolve(cachedATMs);
            } else {
                console.log('hitting the backend to get clean list of ATMs');
                var url = '/api/atms';
                $http.get(url)
                    .success(function (data) {
                        cachedATMs = data;
                        populateATMByIdCache();
                        deferred.resolve(data);
                    })
                .error(function () {
                    deferred.reject('Failed to retrieve the ATM transactions');
                });
            }
            return deferred.promise;
        }

        function getATMById(atmId) {
            var deferred = $q.defer();

            if (cachedATMsById[atmId]) {
                console.log('getting ATM '+ atmId + ' from cache...');
                deferred.resolve(cachedATMsById[atmId]);
            } else {
                console.log('hitting the backend to get ATM ' + atmId);
                    var url = '/api/atms/' + atmId;
                    $http.get(url)
                        .success(function (data) {
                            deferred.resolve(data);
                            cachedATMsById[atmId] = data;
                        })
                        .error(function () {
                            deferred.reject('Failed to get ATM transaction '+ atmId);
                        });
            }
            return deferred.promise;
        }

        function clearCache() {
            cachedATMs = null;
        }

        function populateATMByIdCache() {
            if (cachedATMs) {
                cachedATMs.forEach(function (atm) {
                    cachedATMsById[atm._id] = atm;
                });

            }
        }
    }
}());
