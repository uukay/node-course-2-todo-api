//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

/*
//Create new object IDs the Mongo way
var obj = new ObjectID();
console.log(obj);
*/

/*
//ES6 object destructuring. Create variables out of the key of an object.
var user = {name: 'Andrew', age: 25};
var {name} = user;
console.log(name);
*/

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  
  console.log('Connected to MongoDB server');
  /*
  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if(err){
      return console.log('Unable to insert todo');
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });
  */
  //Insert new doc into Users (name,age,location)
  /*
  db.collection('Users').insertOne({
    name: 'William Kuang',
    age: 26,
    location: 'Granville'
  }, (err, res) => {
    if(err) return console.log('Unable to insert user');
    //console.log(JSON.stringify(res.ops, undefined,2));
    console.log(res.ops[0]._id.getTimestamp());
  })
  */
  db.close();
});