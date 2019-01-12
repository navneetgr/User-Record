var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistrationSchema = new Schema({
	name: String
});

module.exports = mongoose.model('Registration', RegistrationSchema);