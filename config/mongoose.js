var mongoose = require('mongoose');
var userModel = require('../app/models/User');

mongoose.connect('mongodb://localhost/cashtracker');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('cashtracker db opened');
});

userModel.createDefaultUsers();