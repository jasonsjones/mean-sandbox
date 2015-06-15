'use strict';

describe('NavBarLoginCtrl', function () {

    beforeEach(module('app.account'));

    var authservice, sandbox;

    var navbarLoginCtrl,
        mockWindow,
        mockNotifier,
        mockLocation,
        mockIdentity;

    beforeEach(inject(function ($controller, $injector) {

        sandbox = sinon.sandbox.create();
        authservice = $injector.get('sbAuth');

        mockNotifier = {
            notify: function () {}
        },

        mockWindow = {
            localStorage: {
                removeItem: function (item) { }
            }
        },

        mockIdentity = {
            currentUser: {
                username: 'larry'
            },
            isAuthenticated: function () { },
            isAuthorizedForRole: function (role) { }
        };

        mockLocation = {
            path: function (url) { }
        };

        navbarLoginCtrl = $controller('NavBarLoginCtrl', {
            $location: mockLocation,
            $window: mockWindow,
            identity: mockIdentity,
            notifier: mockNotifier
        });
    }));

    afterEach(function () {
        sandbox.restore();
    });

    it('is defined', function () {
       expect(navbarLoginCtrl).to.exist;
    });

    it('login method calls authenticateUser on authservice', inject(function ($q) {
        sandbox.stub(authservice, 'authenticateUser').returns($q.when(true));
        navbarLoginCtrl.login();
        expect(authservice.authenticateUser.calledOnce).to.be.true;
    }));

    it('signout method calls other services', function () {
        sandbox.spy(mockNotifier, 'notify');
        sandbox.spy(mockLocation, 'path');
        sandbox.spy(mockWindow.localStorage, 'removeItem');

        navbarLoginCtrl.signout();

        expect(mockNotifier.notify.calledOnce).to.be.true;
        expect(mockNotifier.notify.calledOnce).to.be.true;
        expect(mockWindow.localStorage.removeItem.calledOnce).to.be.true;
    });
});