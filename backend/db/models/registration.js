var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistrationSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  dob: {type: Date},
  gender: String,
  mobile: Number,
  city: String,
  address: String
});

module.exports = mongoose.model('Registration', RegistrationSchema);