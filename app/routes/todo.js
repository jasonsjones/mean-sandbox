
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
var todoCtrl = require('../controllers/todo');

module.exports = function (api) {

    api.route('/api/todos')
        .get(todoCtrl.getTodos)
        .post(todoCtrl.createTodo);

    api.route('/api/todos/:id')
        .put(todoCtrl.updateTodo)
        .delete(todoCtrl.deleteTodo);
};
