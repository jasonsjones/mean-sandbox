(function () {
    'use strict';

    angular.module('app.core')
        .controller('Controller', Controller);

    //////////////////////////
    function Controller(dataservice, identityservice, notifier) {
        var vm = this;
        vm.identity = identityservice;

        dataservice.getMeanComponents().then(function (results) {
            vm.components = results;
            notifier.info('MEAN components loaded...');
        });
    }
}());
