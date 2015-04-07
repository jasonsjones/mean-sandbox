var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    text: String,
    done: {type: Boolean, default: false}
});

var Todo = mongoose.model('Todo', todoSchema);

exports.createDefaultTodos = function () {
    Todo.find({}).exec(function (err, collection) {
        if (err) {
        }
        if (collection.length === 0) {
            console.log('creating list of default todos in db...');
        }

        Todo.create({text: 'Write resume'});
        Todo.create({text: 'Set up utilities for new house'});
        Todo.create({text: 'Finish personal projects'});
        Todo.create({text: 'Complete linkedin profile'});
    });

};