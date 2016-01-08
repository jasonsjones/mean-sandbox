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
        vm.cityInfo = null;

        vm.getWxByZip = getWxByZip;
        vm.getInfoByZip = getInfoByZip;

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

        function getInfoByZip(zip) {
            vm.loading = true;
            wxService.getInfoByZip(zip)
                .then(function(data) {
                    vm.cityInfo = data;
                    vm.loading = false;
                    console.log(vm.cityInfo);
                });
        }

        function primeWxInfo() {
            if (identity.currentUser) {
                getWxByZip(identity.currentUser.zipcode);
            } else {
                // getWxByZip(vm.zipcode);
                getInfoByZip(vm.zipcode);
            }
        }

    }
}());
