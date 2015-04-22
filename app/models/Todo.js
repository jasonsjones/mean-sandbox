var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    text: String,
    done: {type: Boolean, default: false},
    userId: {type: String, default: 'global'}
});

var Todo = mongoose.model('Todo', todoSchema);

exports.createDefaultTodos = function () {
    Todo.find({}).exec(function (err, collection) {
        if (err) {
        }
        if (collection.length === 0) {
            console.log('creating list of default todos in db...');
            Todo.create({text: 'Write resume'});
            Todo.create({text: 'Clean old house'});
            Todo.create({text: 'Finish personal projects'});
            Todo.create({text: 'Complete linkedin profile'});
        }
    });

};
