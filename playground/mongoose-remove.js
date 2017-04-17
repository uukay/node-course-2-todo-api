const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/*
//Remove all
Todo.remove({}).then((result) => {
  console.log(result);
});
*/
//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findByIdAndRemove('58f473db09e150c22bbac113')
.then((todo) => {
  console.log(todo);
});