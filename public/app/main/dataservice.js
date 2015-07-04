(function () {
    'use strict';

    angular.module('app.core')
        .factory('dataservice', dataserviceFactory);

    function dataserviceFactory($q, $http) {
        var meanComponents = [
            {imgUrl: 'img/mongodb.png',
             webUrl: 'http://www.mongodb.org',
             description: 'MongoDB is the leading NoSQL database, empowering ' +
                          'businesses to be more agile and scalable'
            },
            {imgUrl: 'img/express.png',
             webUrl: 'http://expressjs.com',
             description: 'Express is a minal and flexible node.js web application ' +
                 'framework, providing a robust set of features for building single-' +
                 ' and multi-page, and hybrid web applications'
            },
            {imgUrl: 'img/angularjs.png',
             webUrl: 'https://angularjs.org',
             description: 'AngularJS lets you extend HTML vocabulary for your ' +
                 'application.  The resulting environment is extraordinarily ' +
                 'expressive, readable, and quick to develop'
            },
            {imgUrl: 'img/nodejs.png',
             webUrl: 'http://nodejs.org',
             description: 'Node.js is a platform built on Chrome\'s JavaScript runtime ' +
                 'for easily building fast, scalable network applications'
            }
        ];

        var factory = {
            query: query
        };

        return factory;

        /********* Implementation Details **********/
        function query() {
            return $q.when(meanComponents);
        }

        function newQuery() {
            var deferred = $q.defer();

            $http.get('./mean-components.json')
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    console.log('unable to get the mean-components');
                });

            return deferred.promise;
        }
    }
}());
