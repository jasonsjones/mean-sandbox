(function () {
    'use strict';

    angular.module('app.core')
        .factory('dataservice', dataservice);

    ///////////////////////
    function dataservice($q) {
        var text = 'Hello world from ng service';
        var mean_components = [
            { img_url: 'img/mongodb.png',
              description: 'MongoDB is the leading NoSQL database, empowering businesses to be more agile and scalable'
            },
            { img_url: 'img/express.png',
              description: 'Express is a minal and flexible node.js web application framework,' +
              ' providing a robust set of features for building single- and multi-page, and hybrid web applications'
            },
            { img_url: 'img/angularjs.png',
              description: 'AngularJS lets you extend HTML vocabulary for your application.' +
              '  The resulting environment is extraordinarily expressive, readable, and quick to develop'
            },
            { img_url: 'img/nodejs.png',
              description: 'Node.js is a platform built on Chrome\'s JavaScript runtime for easily' +
              ' building fast, scalable network applications.'
            }

        ];
        var factory = {
            getText: getText,
            getMeanComponents: getMeanComponents
        };

        return factory;

        ///////////////
        function getText() {
            return text;
        }

        function getMeanComponents() {
            var deferred = $q.defer();
            deferred.resolve(mean_components);

            return deferred.promise;
        }
    }
}());
