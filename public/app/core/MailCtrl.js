(function () {
    'use strict';

    angular.module('app.core')
        .controller('MailCtrl', MailCtrl);

    MailCtrl.$inject = ['$location', 'mailer', 'notifier'];
    function MailCtrl($location, mailer, notifier) {
        console.log('MailCtrl loaded and ready to work...');
        var vm = this;

        vm.sendContactEmail = sendContactEmail;

        /********** Implementation Details **********/
        function sendContactEmail() {
            var mailPayload = {
                from: vm.userEmail,
                subject: vm.subject,
                message: vm.msgBody
            };

            mailer.sendContactEmail(mailPayload)
                .then(function (data) {
                    if (data.success) {
                        notifier.info('Message sent -- Thank you!');
                    } else {
                        notifier.err(data.message);
                    }
                });

            $location.path('/');
        }
    }

}());
