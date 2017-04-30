const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
// User Model
// email - require it - trim it- set type - set min length of 1

var UserSchema = new mongoose.Schema({
  email: {
    type: String, 
    required: true, 
    minlength: 1, 
    trim: true, 
    unique: true, 
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email' 
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true,
      
    },
    token: {
      type: String,
      required: true,      
    },
  }]  
});

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  
  return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  
  user.tokens.push({access, token});
  
  return user
  .save()
  .then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;
  
  try{
    decoded = jwt.verify(token, 'abc123');
  }
  catch(e){
    return Promise.reject('test');
  }
  
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
  
  
}






var User = mongoose.model('User', UserSchema)
/*
var newUser = new User({
  email: 'william@hotmail.com'
})

newUser.save().then((user) => {
  console.log('Saved new user', user);
}, (e) => {
  console.log('Unable to save user', e);
})
*/
module.exports = {User};