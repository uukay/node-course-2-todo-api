//Library imports
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

//Local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;


//Middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  
  todo.save()
  .then(
    (doc) => {
      res.send(doc);
    }, 
    (e) => {
      res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
  Todo
  .find()
  .then(
    (todos) => {
      res.send({todos})
    },
    (e) => {
      res.status(400).send(e);
    }
  );
});


//Get /todos/123456
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  //Validate id using isValid
    //If not valid: 404 - send back empty send
  if(!ObjectID.isValid(id)){
    console.log('ID is not in valid format');
    return res.status(404).send();
  }  
  
  //findById
    //success
  Todo.findById(id)
  .then((todo) => {
    //if no todo - send back 404 with empty body
    if(!todo) return res.status(404).send();
    //if todo - send it back
    return res.status(200).send({todo});
  })
  .catch((e) => {
    //error
    //400 - send back empty body back
    return res.status(400).send()
  })
})









app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};