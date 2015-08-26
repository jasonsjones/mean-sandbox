//
// # SimpleServer
//
var env = process.env.NODE_ENV || 'devlocal';
var config = require('./config/config')[env];

require('./config/mongoose')(config);

var app = require('./config/express')(config);

require('./config/passport')(config);

app.listen(config.port, function () {
    console.log('Server started on port ' + config.port);
});
