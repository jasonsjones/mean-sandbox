var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    text: String,
    done: {type: Boolean, default: false},
    createdOn: {type: Date, default: Date.now()},
    userId: {type: String, default: 'global'}
});

var Todo = mongoose.model('Todo', todoSchema);
