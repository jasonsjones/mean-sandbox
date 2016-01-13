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

    app.get('/*', function (req, res) {
        res.sendFile(path.resolve(__dirname + indexPath));
    });
};
