var mongoose = require('mongoose');
var userModel = require('../app/models/User');
var todoModel = require('../app/models/Todo');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback() {
        console.log(config.db + ' db opened');
    });

    userModel.createDefaultUsers();
    todoModel.createDefaultTodos();
};
