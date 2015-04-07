
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

module.exports = function (api) {
    api.get('/api/todos', function (req, res) {
        Todo.find({}).exec(function (err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });
};