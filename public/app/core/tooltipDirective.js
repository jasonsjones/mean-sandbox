(function () {
    angular.module('app.core')
        .directive('tooltip', tooltip);

    /////////
    function tooltip() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).tooltip();
            }

        };
    }
}());
