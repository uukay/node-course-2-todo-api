var mongoose = require('mongoose');

// User Model
// email - require it - trim it- set type - set min length of 1

var User = mongoose.model('User', {
  email: {type: String, required: true, minlength: 1, trim: true}
})
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