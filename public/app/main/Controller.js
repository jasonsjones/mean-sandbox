(function () {
    'use strict';

    angular.module('app.core')
        .controller('Controller', Controller);

    //////////////////////////
    function Controller(dataservice, identity, notifier) {
        var vm = this;
        vm.identity = identity;
        vm.components = dataservice.query();

        // dataservice.query().then(function (results) {
        //     vm.components = results;
        //     notifier.info('MEAN components loaded...');
        // });
    }
}());
