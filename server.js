//
// # SimpleServer
//
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

var app = require('./config/express')(config);

require('./config/mongoose');

require('./app/routes/user')(app);
// this route needs to be defined at the end of all other routes
require('./app/routes/index')(app);

require('./config/passport')();

app.listen(config.port, function () {
    console.log('Server started on port ' + config.port);
});
