var https = require('https');
var http = require('http');

module.exports = function (app) {

    app.get('/api/cityinfo/:zip', function (req, res) {

        var zip = req.params.zip;
        var key = process.env.MS_ZIPCODE_APIKEY;

        var optionsGet = {
            host: 'www.zipcodeapi.com',
            port: 443,
            path: '/rest/' + key + '/info.json/' + zip + '/degrees',
            method: 'GET'
        };

        makeApiCall('https', optionsGet, res);

    });

    app.get('/api/weather/:zip', function (req, res) {

        var zip = req.params.zip;
        var key = process.env.MS_OPENWEATHER_APIKEY;

        var optionsGet = {
            host: 'api.openweathermap.org',
            port: 80,
            path: '/data/2.5/weather?zip=' + zip + ',us&units=imperial&APPID=' + key,
            method: 'GET'
        };

        makeApiCall('http', optionsGet, res);
    });

    function makeApiCall(protocol, opts, res) {
        var payload = '';
        var reqGet = null;
        if (protocol === 'https') {
            reqGet = https.request(opts, requestCB);
        } else {
            reqGet = http.request(opts, requestCB);
        }

        reqGet.end();
        reqGet.on('error', function (e) {
            console.log(e);
        });

        function requestCB(response) {
            response.on('data', function (data) {
                payload += data;
                res.json(JSON.parse(payload));
            });
        }
    }
};
