'use strict';

describe('Controller', function () {

    beforeEach(module('app.core'));

    var mainCtrl,
        querySpy,
        mockDataservice,
        mockIdentity;

    var dummyData = ["mean", "components", "go", "here"];

    beforeEach(inject(function ($controller, $q) {
        mockDataservice = {
            query: function () {
                return $q.when(dummyData);
            }
        };

        mockIdentity = {
            currentUser: {},
            isAuthenticated: function () {
                return true;
            },
            isAuthorizedForRole: function (role) {
                return role === 'admin' ? false : true;
            }
        };

        querySpy = sinon.spy(mockDataservice, 'query');

        mainCtrl = $controller('Controller', {
            dataservice: mockDataservice,
            identity: mockIdentity
        });
    }));

    afterEach(function () {
        mockDataservice.query.restore();
    });

    it('is defined', function () {
        expect(mainCtrl).to.exist;
    });

    it('has an identity property', function () {
        expect(mainCtrl.identity).to.exist;
    });

    it('determines if a user is authenticated', function () {
        expect(mainCtrl.identity.isAuthenticated()).to.be.true;
    });

    it('determines if a user is authorized for role', function () {
        expect(mainCtrl.identity.isAuthorizedForRole('admin')).to.be.false;
    });

    it('calls on the dataservice to initialize components', function () {
        expect(querySpy.called).to.be.true;
    });

    it('initializes components with array of data', inject(function ($rootScope) {
        $rootScope.$apply();
        expect(querySpy.called).to.be.true;
        expect(mainCtrl.components).to.be.an.Array;
        expect(mainCtrl.components).to.have.length(dummyData.length);
    }));
});