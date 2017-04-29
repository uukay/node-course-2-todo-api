require('./config/config.js');

//Library imports
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

//Local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.json());

//Post
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

app.delete('/todos/:id', (req, res) => {
  // Get the id
  var id = req.params.id;
  //Validate the id -> not valid return 404
  if(!ObjectID.isValid(id)){
    console.log('ID is not in valid format');
    return res.status(404).send();
  }    

  //Remove todo by id
  Todo.findByIdAndRemove(id)
  .then((todo) => {
    //Success
    //if no doc, send 404
    if(!todo) return res.status(404).send();
    //if doc, send back doc with 200
    return res.status(200).send({todo});
  })
  .catch((e) => {
    //Error
      //400 with empty body
    return res.status(400).send()
  })  
});

app.patch('/todos/:id', (req,res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);
	
  if(!ObjectID.isValid(id)){
    console.log('ID is not in valid format');
    return res.status(404).send();
  }    	
  
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }
  else{
    body.completed = false;
    body.completedAt = null;
  }
  
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo){
      return res.status(400).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
	
	
	
})





app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};