var path = require('path');

module.exports = function (app, env) {

    var indexPath;
    switch (env) {
        case 'build':
            indexPath = '/../../build/index.html';
            break;
        default:
            indexPath = '/../../public/index.html';

    }

    app.get('/api/cityinfo/:zip', function (req, res) {
        var https = require('https');

        var zip = req.params.zip;
        var key = process.env.MS_ZIPCODE_APIKEY;
        var payload = '';

        var optionsGet = {
            host: 'www.zipcodeapi.com',
            port: 443,
            path: '/rest/' + key + '/info.json/' + zip + '/degrees',
            method: 'GET'
        };

        var reqGet = https.request(optionsGet, function (response) {
            response.on('data', function (data) {
                payload += data;
                res.json(JSON.parse(payload));
            });
        });

        reqGet.end();
        reqGet.on('error', function (e) {
            console.log(e);
        });
    });

    app.get('/api/weather/:zip', function (req, res) {
        var http = require('http');

        var zip = req.params.zip;
        var key = process.env.MS_OPENWEATHER_APIKEY;
        var payload = '';

        var optionsGet = {
            host: 'api.openweathermap.org',
            port: 80,
            path: '/data/2.5/weather?zip=' + zip + ',us&units=imperial&APPID=' + key,
            method: 'GET'
        };

        var reqGet = http.request(optionsGet, function (response) {
            response.on('data', function (data) {
                payload += data;
                res.json(JSON.parse(payload));
            });
        });

        reqGet.end();
        reqGet.on('error', function (e) {
            console.log(e);
        });
    });

    app.get('/*', function (req, res) {
        res.sendFile(path.resolve(__dirname + indexPath));
    });
};
