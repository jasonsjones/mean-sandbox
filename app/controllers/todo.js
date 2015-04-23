var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

function _getTodos(req, res) {
    Todo.find({userId: {$in: ['global', req.session.user._id]}})
        .exec(function (err, todos) {
            if (err) {
                res.send(err);
            } else {
                res.json(todos);
            }
        });
}

exports.getTodos = function (req, res) {
    _getTodos(req, res);
};

exports.createTodo = function (req, res) {
    var newTodo = req.body;
    newTodo.userId = req.session.user._id;

    Todo.create(newTodo, function (err, todo) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            _getTodos(req, res);
        }
    });
};

exports.deleteTodo = function (req, res) {
    Todo.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.send(err);
        } else {
            _getTodos(req, res);
        }
    });
};

exports.updateTodo = function (req, res) {
    var todoData = req.body;
    console.log(todoData);
};
