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
                var baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
                var query = '?zip=' + zip + ',us&units=imperial';
                var API = '&APPID=a600be65b6ec16f86cf386aefd894300';
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

        function getInfoByZip(zip) {
            var deferred = $q.defer();
            if (cityInfoCache) {
                deferred.resolve(cityInfoCache);
            } else {
                var key = 'pPRkpWH11B8ZiypsBuFNFR6DwwvcVZIkPzFevmgxXoxgXWIzqnm6etJL0fXVfGf4';
                var baseUrl = 'https://www.zipcodeapi.com/rest/' + key;
                var query = '/info.json/' + zip + '/degrees';
                var url = baseUrl + query;
                console.log(url);

                // call $http.get(url) to get data to pass to the resolve method
                deferred.resolve({city: 'Seattle', state: 'WA'});
            }
            return deferred.promise;
        }

        function clearCache() {
            wxCache = null;
            cityInfoCache = null;
        }
    }
}());
