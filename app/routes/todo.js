
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

    api.post('/api/todos', function (req, res) {
        var newTodo = req.body;

        Todo.create(newTodo, function (err, todo) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            res.json(todo);
        });
    });
};
