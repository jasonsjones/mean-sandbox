(function() {
    'use strict';

    angular.module('app.core').value('toastr', toastr);

    angular.module('app.core').factory('notifier', notifier);

    function notifier(toastr) {
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
})();