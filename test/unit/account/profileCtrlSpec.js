'use strict';

describe('ProfileCtrl', function () {

    beforeEach(module('app.core'))
    beforeEach(module('app.account'))

    var regService, authService, sandbox;

    var profileCtrl,
        mockNotifier,
        mockLocation,
        mockIdentity;

    beforeEach(inject(function ($controller, $injector, $q) {

        var user = {
            'firstName': 'Larry',
            'lastName': 'Smith',
             'email': 'larry@larrySmith.com',
            'local': {
                'username': 'larry'
            }
        };

        sandbox = sinon.sandbox.create();
        regService = $injector.get('register');
        authService = $injector.get('sbAuth');

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
            isAuthorizedForRole: function (role) { },
            getCurrentUserFromServer: function () {
                return $q.when(user);
            }
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
