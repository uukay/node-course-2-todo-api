const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
/*
var id = '68f43718a5b00a9c2243ab8411';

if(!ObjectID.isValid(id)){
  console.log('ID not valid');
}
*/

/*
//
Todo.find({
  _id: id
})
.then((todos) => {
  if(!todos || todos.length === 0){
    return console.log('Id not found');
  }  
  console.log('Todos', todos)
});
//
Todo.findOne({
  _id: id
})
.then((todo) => {
  if(!todo){
    return console.log('Id not found');
  }  
  console.log('Todo', todo)
});


//
Todo.findById(id)
.then((todo) => {
  if(!todo){
    return console.log('Id not found');
  }
  console.log('Todo By Id', todo);
})
.catch((e) => console.log(e));
*/

User.findById('58f309fc34a529bc1f3bc007')
.then((user) => {
  if(!user) return console.log('User not found');
  console.log('User by Id', user);
})
.catch((e) => {
  console.log(e);
})

