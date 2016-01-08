(function () {
    'use strict';

    angular.module('app.core')
        .controller('MailController', MailController);

    MailController.$inject = ['$location', 'mailer', 'notifier'];
    function MailController($location, mailer, notifier) {
        var vm = this;

        vm.sendContactEmail = sendContactEmail;

        /********** Implementation Details **********/
        function sendContactEmail() {
            var mailPayload = {
                from: vm.userEmail,
                subject: vm.subject,
                message: vm.msgBody
            };

            if (mailPayload.from && mailPayload.subject && mailPayload.message) {
                mailer.sendContactEmail(mailPayload)
                    .then(function (data) {
                        if (data.success) {
                            notifier.info('Message sent -- Thank you!');
                        } else {
                            notifier.error(data.message);
                        }
                    });

                $location.path('/');

            } else {
                notifier.error('Please fill out all the information before submitting. ' +
                ' Thank you.');
            }
        }
    }

}());
