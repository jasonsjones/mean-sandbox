(function () {
    'use strict';

    angular.module('app.core')
        .controller('Controller', Controller);

    //////////////////////////
    function Controller(dataservice, sbIdentity, notifier) {
        var vm = this;
        vm.identity = sbIdentity;

        dataservice.getMeanComponents().then(function (results) {
            vm.components = results;
            notifier.info('MEAN components loaded...');
        });
    }
}());
