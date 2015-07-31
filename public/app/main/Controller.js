(function () {
    'use strict';

    angular.module('app.core')
        .controller('Controller', Controller);

    Controller.$inject = ['dataservice', 'identity'];
    function Controller(dataservice, identity) {

        var vm = this;
        vm.identity = identity;
        vm.components = [];

        activate();

        /********* Implementation Details **********/
        function activate() {
            getComponents();
        }

        function getComponents() {
            dataservice.query().then(function (results) {
                vm.components = results;
            });
        }
    }
}());
