(function() {
    'use strict';

    angular.module('app.core').value('toastr', toastr);

    angular.module('app.core').factory('notifier', notifier);

    function notifier(toastr) {
        toastr.options.closeButton = true;
        toastr.options.progressBar = true;
        toastr.options.positionClass = 'toast-bottom-right';
       return {
           notify: function(msg) {
               toastr.success(msg);
               console.log(msg);
           },
           error: function(msg) {
               toastr.error(msg);
               console.log(msg);
           },
           info: function (msg) {
               toastr.info(msg);
               console.log(msg);
           }
       };
    }
}());
