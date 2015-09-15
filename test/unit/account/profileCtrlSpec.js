'use strict';

describe('ProfileCtrl', function () {

    beforeEach(module('app.core'))
    beforeEach(module('app.account'))

    var regService, authService, idService, sandbox;

    var profileCtrl,
        mockNotifier,
        mockLocation;

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
        idService = $injector.get('identity');

        mockNotifier = {
            notify: function () {}
        };

        mockLocation = {
            path: function (url) { }
        };

        sandbox.stub(idService, 'getCurrentUserFromServer').returns($q.when(user));

        profileCtrl = $controller('ProfileCtrl', {
            $location: mockLocation,
            //identity: mockIdentity,
            notifier: mockNotifier
        });
    }));

    afterEach(function () {
        sandbox.restore();
    });

    it('is defined', function () {
        expect(profileCtrl).to.exist;
    });

    it('editPassword flag is false by default', function () {
        expect(profileCtrl.editPassword).to.be.false;
    });

    it('editPassword flag is toggled with call to toggleEditPassword', function () {
        expect(profileCtrl.editPassword).to.be.false;
        profileCtrl.toggleEditPassword();
        expect(profileCtrl.editPassword).to.be.true;
    });

    it('identity.getCurrentUserFromServer is called when controller is loaded', function () {
        expect(idService.getCurrentUserFromServer.calledOnce).to.be.true;
    });
});
