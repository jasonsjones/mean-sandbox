(function () {
    'use strict';

    angular.module('app.weather')
        .factory('wxService', wxService);

    wxService.$inject = ['$http', '$q'];
    function wxService($http, $q) {
        var wxCache = null;

        var factory = {
            getWxByZip: getWxByZip,
            clearCache: clearCache
        };

        return factory;

        /********** Implementation Details *********/
        function getWxByZip(zip) {
            var deferred = $q.defer();
            if (wxCache) {
                deferred.resolve(wxCache);
            } else {
                var baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
                var query = '?zip=' + zip + ',us&units=imperial';
                var API = '&APPID=a600be65b6ec16f86cf386aefd894300'
                var url = baseUrl + query + API;

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

        function clearCache() {
            wxCache = null;
        }
    }
}());
