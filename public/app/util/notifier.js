(function() {
    'use strict';

    angular.module('app.core').value('toastr', toastr);

    angular.module('app.core')
        .factory('notifier', notifier);

    notifier.$inject = ['toastr'];
    function notifier(toastr) {
        toastr.options.closeButton = true;
        toastr.options.progressBar = true;
        toastr.options.positionClass = 'toast-bottom-right';

        return {
            notify: notify,
            error: error,
            info: info
        };

        /********** Implementation Details *********/
        function notify(msg) {
            toastr.success(msg);
            console.log('LOG: ' + msg);
        }

        function error(msg) {
            toastr.error(msg);
            console.log('ERROR: ' + msg);
        }

        function info(msg) {
            toastr.info(msg);
            console.log('INFO: ' + msg);
        }
    }
}());
