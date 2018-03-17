const 	mongoose = require('mongoose'),
		Schema = mongoose.schema,
		Agent = require('./agentModel.js'),
		Request = require('./requestModel.js')


const userSchema = new mongoose.Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	fullname: {type: String, required: true},
	idArray: [String],
	requestedProperties: [Request.schema],
	agent: [Agent.schema]

})

module.exports = mongoose.model('User', userSchema);