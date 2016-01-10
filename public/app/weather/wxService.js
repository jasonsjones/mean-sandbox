(function () {
    'use strict';

    angular.module('app.weather')
        .factory('wxService', wxService);

    wxService.$inject = ['$http', '$q'];
    function wxService($http, $q) {
        var wxCache = null;
        var cityInfoCache = null;

        var factory = {
            getWxByZip: getWxByZip,
            getInfoByZip: getInfoByZip,
            clearCache: clearCache
        };

        return factory;

        /********** Implementation Details *********/
        function getWxByZip(zip) {
            var deferred = $q.defer();
            if (wxCache) {
                deferred.resolve(wxCache);
            } else {
                var url = 'api/weather/' + zip;

                $http.get(url)
                    .success(function (data) {
                        wxCache = data;
                        deferred.resolve(data);
                    })
                    .error(function (response) {
                        deferred.reject(response);
                    });
            }
            return deferred.promise;

        }

        function getInfoByZip(zip) {
            var deferred = $q.defer();
            if (cityInfoCache) {
                deferred.resolve(cityInfoCache);
                console.log('returning cityInfoCache...');
            } else {
                var url = 'api/cityinfo/' + zip;

                $http.get(url)
                    .success(function (data) {
                        cityInfoCache = data;
                        deferred.resolve(data);
                    })
                    .error(function (response) {
                        deferred.reject(response);
                    });
            }
            return deferred.promise;
        }

        function clearCache() {
            wxCache = null;
            cityInfoCache = null;
        }
    }
}());
