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
});