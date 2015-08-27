(function () {
    'use strict';

    angular.module('app.weather')
        .controller('WxCtrl', WxCtrl);

    WxCtrl.$inject = ['$scope', 'identity', 'wxService'];
    function WxCtrl($scope, identity, wxService) {
        var vm = this;

        vm.zipcode = '98125';
        vm.loading = true;
        vm.wx = null;

        vm.getWxByZip = getWxByZip;

        $scope.$on('userChange', function (data) {
            wxService.clearCache();
            primeWxInfo();
        });

        activate();

        /********** Implementation Details **********/
        function activate() {
            primeWxInfo();
        }

        function getWxByZip(zip) {
            vm.loading = true;
            wxService.getWxByZip(zip)
                .then(function(data) {
                    vm.wx = data;
                    vm.loading = false;
                });
        }

        function primeWxInfo() {
            if (identity.currentUser) {
                getWxByZip(identity.currentUser.zipcode);
            } else {
                getWxByZip(vm.zipcode);
            }
        }

    }
}());
