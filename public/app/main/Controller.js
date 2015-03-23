(function () {
    'use strict';

    angular.module('app.core')
        .controller('Controller', Controller);

    //////////////////////////
    function Controller(dataservice, sbIdentity, notifier) {
        var vm = this;
        vm.identity = sbIdentity;
        vm.components = dataservice.query();

        // dataservice.query().then(function (results) {
        //     vm.components = results;
        //     notifier.info('MEAN components loaded...');
        // });
    }
}());
