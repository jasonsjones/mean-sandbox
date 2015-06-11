describe('Controller', function () {

    beforeEach(module('app.core'));

    var mainCtrl,
        querySpy,
        deferred,
        mockDataservice,
        mockIdentity;

    beforeEach(inject(function ($controller, $q) {
        mockDataservice = {
            query: function () {
                deferred = $q.defer();
                return deferred.promise;
            }
        };

        mockIdentity = {
            currentUser: {},
            isAuthenticated: function () {
                return true;
            },
            isAuthorizedForRole: function () {
                return false;
            }
        };

        querySpy = sinon.spy(mockDataservice, 'query');

        mainCtrl = $controller('Controller', {
            dataservice: mockDataservice,
            notifier: {},
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

    it('calls on the dataservice to initialize components', function () {
        expect(querySpy.called).to.be.true;
    });

    it('initializes components with array of data', function () {
        expect(querySpy.called).to.be.true;
        expect(mainCtrl.components).to.be.an.Array;
        //expect(mainCtrl.components).to.have.length(4);
    });
});