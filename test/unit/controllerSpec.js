describe('Controller', function () {

    beforeEach(module('app.core'));

    var mainCtrl;
    var spy;
    var mockDataservice = {
        query: function () {
            return [1, 2, 3, 4];
        }
    };

    beforeEach(inject(function ($controller) {
        spy = sinon.spy(mockDataservice, 'query');
        mainCtrl = $controller('Controller', {
            dataservice: mockDataservice,
            notifier: {},
            identity: {}
        });
    }));

    afterEach(function () {
        mockDataservice.query.restore();
    });

    it('is defined', function () {
        expect(mainCtrl).to.exist;
    });

    it('calls on the dataservice to initialize components', function () {
        expect(spy.called).to.be.true;
    });
});