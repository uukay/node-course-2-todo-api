//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  
  console.log('Connected to MongoDB server');
  /*
  var filter = {
    _id: new ObjectID('58f1b21aa30fa8675e174787')
  };
  
  var update = {
    $set: {
      completed: true
    }
  };
  
  var options = {
    returnOriginal: false
  }
  
  db.collection('Todos').findOneAndUpdate(filter, update, options).then((result) => {
    console.log(result);
  })
*/
  var filter = {
    _id: new ObjectID('58f19511ce8e6718c0574a1b')
  };
  
  var update = {
    $inc: {
      age: 1
    },
    $set: {
      name: 'William Kuang'
    }
  };
  
  var options = {
    returnOriginal: false
  }
  
  db.collection('Users').findOneAndUpdate(filter, update, options).then((result) => {
    console.log(result);
  })  
  
  
  
  //db.close();
});