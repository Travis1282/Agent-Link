const 	mongoose = require('mongoose'),
		Schema = mongoose.schema,
		User = require('./userModel.js');

const agentSchema = new mongoose.Schema({
	fullname: {type: String, required: true},
	email: {type: String, required: true},
	mlsid: {type: Number, required: true}, //email will be the username 
	password: {type: String, required: true},
	//showingrequests: {}, //need to figure out data structure
	//agents: Boolean
	//users: [User.schema]


})

module.exports = mongoose.model('Agent', agentSchema);
