(function () {
    'use strict';
    angular.module('app.core')
        .factory('dataCache', dataCache);

    dataCache.$inject = ['atmCache', 'todoCache'];
    function dataCache(atmCache, todoCache) {

        var factory = {
            clearAllCache: clearAllCache
        };

        return factory;

        /*************** Implementation Details ******************/
        function clearAllCache() {
            console.log('clearing out all cached data...');
            atmCache.clearCache();
            todoCache.clearCache();
        }

    }
}());
