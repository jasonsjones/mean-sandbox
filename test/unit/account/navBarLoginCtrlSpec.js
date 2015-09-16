'use strict';

describe('NavBarLoginCtrl', function () {

    beforeEach(module('app.core'));
    beforeEach(module('app.atm'));
    beforeEach(module('app.todo'));
    beforeEach(module('app.account'));

    var authservice, dataCacheService, sandbox;

    var navbarLoginCtrl,
        mockWindow,
        mockNotifier,
        mockLocation,
        mockIdentity;

    beforeEach(inject(function ($controller, $injector, $q) {

        sandbox = sinon.sandbox.create();
        authservice = $injector.get('sbAuth');
        dataCacheService = $injector.get('dataCache');

        mockNotifier = {
            notify: function () {}
        };

        mockWindow = {
            sessionStorage: {
                removeItem: function (item) { }
            }
        };

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

        sandbox.stub(authservice, 'getCurrentUserFromServer').returns($q.when(true));

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

    it('has an identity property', function () {
        expect(navbarLoginCtrl.identity).to.exist;
    });

    it('calls getCurrentUserFromServer method from authservice when instantiated', function () {
        expect(authservice.getCurrentUserFromServer.calledOnce).to.be.true;
    });

    it('determines if a user is authenticated', function () {
        sandbox.stub(mockIdentity, 'isAuthenticated').returns(true);
        expect(navbarLoginCtrl.identity.isAuthenticated()).to.be.true;
    });

    it('determines if a user is authorized for role', function () {
        sandbox.stub(mockIdentity, 'isAuthorizedForRole').returns(false);
        expect(navbarLoginCtrl.identity.isAuthorizedForRole('admin')).to.be.false;
    });

    it('login method calls authenticateUser on authservice', inject(function ($q) {
        sandbox.stub(authservice, 'authenticateUser').returns($q.when(true));
        navbarLoginCtrl.login();
        expect(authservice.authenticateUser.calledOnce).to.be.true;
    }));

    it('loginWithTwitter calls authenticateUserWithTwitter on authservice', function () {
        sandbox.spy(authservice, 'authenticateUserWithTwitter');
        navbarLoginCtrl.loginWithTwitter();
        expect(authservice.authenticateUserWithTwitter.calledOnce).to.be.true;
    });

    it('signout method calls other services', inject(function ($q) {
        sandbox.spy(mockNotifier, 'notify');
        sandbox.spy(mockLocation, 'path');
        sandbox.spy(mockWindow.sessionStorage, 'removeItem');
        sandbox.spy(dataCacheService, 'clearAllCache');
        sandbox.stub(authservice, 'signOutUser').returns($q.when(true));

        navbarLoginCtrl.signout();

        expect(mockNotifier.notify.calledOnce).to.be.true;
        expect(mockNotifier.notify.calledOnce).to.be.true;
        expect(mockWindow.sessionStorage.removeItem.calledOnce).to.be.true;
        expect(dataCacheService.clearAllCache.calledOnce).to.be.true;
        expect(authservice.signOutUser.calledOnce).to.be.true;
    }));
});
