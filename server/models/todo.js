var mongoose = require('mongoose');

//Todo model
var Todo = mongoose.model('Todo', {
  text: {type: String, required: true, minlength: 1, trim: true},
  completed: {type: Boolean, default: false},
  completedAt: {type: Number, default: null}
});
/*
var newTodo = new Todo({
  text: 'Cook dinner'
});

//Call a method onto the new record to save it to the database
newTodo.save().then((doc) => {
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo');
});
*/
/*
var newTodo = new Todo({
  text: 23
});

//Call a method onto the new record to save it to the database
newTodo.save().then((doc) => {
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo');
});
*/

module.exports = {Todo};