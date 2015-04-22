
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
        // TODO: add newTodo.userId = req.user._id
        // once express-session is set up

        Todo.create(newTodo, function (err, todo) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            Todo.find({}).exec(function (err, todos) {
                if (err) {
                    return res.send(err);
                }
                res.json(todos);
            });
        });
    });

    api.delete('/api/todos/:id', function (req, res) {
        Todo.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                return res.send(err);
            }
            Todo.find({}).exec(function (err, todos) {
                if (err) {
                    return res.send(err);
                }
                res.json(todos);
            });
        });

    });
};
