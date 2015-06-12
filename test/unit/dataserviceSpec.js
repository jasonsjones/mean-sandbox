'use strict';

describe('dataservice', function () {

    beforeEach(module('app.core'));

    var dataservice;

    beforeEach(function () {
        inject(function ($injector) {
            dataservice = $injector.get('dataservice');
        });
    });

    it('is defined', function () {
        expect(dataservice).to.exist;
    });

    it('query method returns array of data', inject(function ($rootScope) {

        dataservice.query().then(function (data) {
            expect(data).to.exist;
            expect(data).to.be.an.Array;
            expect(data).to.have.length(4);
        });
        $rootScope.$apply();
    }));
});