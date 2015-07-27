'use strict';

describe('ProfileCtrl', function () {

    beforeEach(module('app.account'))
    beforeEach(function () {
        module('app.core');
    });

    var regService, sandbox;

    var profileCtrl,
        mockNotifier,
        mockLocation,
        mockIdentity;

    beforeEach(inject(function ($controller, $injector) {

        sandbox = sinon.sandbox.create();
        regService = $injector.get('register');

        mockNotifier = {
            notify: function () {}
        };

        mockIdentity = {
            currentUser: {
                local: {
                    username: 'larry'
                }
            },
            isAuthenticated: function () { },
            isAuthorizedForRole: function (role) { }
        };

        mockLocation = {
            path: function (url) { }
        };

        profileCtrl = $controller('ProfileCtrl', {
            $location: mockLocation,
            identity: mockIdentity,
            notifier: mockNotifier
        });
    }));

    afterEach(function () {
        sandbox.restore();
    });

    it('is defined', function () {
       expect(profileCtrl).to.exist;
    });
});