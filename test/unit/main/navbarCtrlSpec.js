'use strict';

describe('NavBarController', function () {

    beforeEach(module('app.core'));

    var navbarCtrl,
        mockLocation,
        mockIdentity;

    beforeEach(inject(function ($controller) {

        mockIdentity = {
            currentUser: {},
            isAuthenticated: function () {
                return true;
            },
            isAuthorizedForRole: function (role) {
                return role === 'admin' ? false : true;
            }
        };

        mockLocation = {
            path: function () {
                return 'home';
            }
        };

        navbarCtrl = $controller('NavBarController', {
            $location: mockLocation,
            identity: mockIdentity
        });
    }));

    it('is defined', function () {
       expect(navbarCtrl).to.exist;
    });

    it('has an identity property', function () {
        expect(navbarCtrl.identity).to.exist;
    });

    it('determines if a user is authenticated', function () {
        expect(navbarCtrl.identity.isAuthenticated()).to.be.true;
    });

    it('determines if a user is authorized for role', function () {
        expect(navbarCtrl.identity.isAuthorizedForRole('admin')).to.be.false;
    });

    it('returns true if the home page is the active page', function () {
        expect(navbarCtrl.isActive('home')).to.be.true;
    });

    it('returns false if the about page is not the active page', function () {
        expect(navbarCtrl.isActive('about')).to.be.false;
    });

});
