const 	mongoose = require('mongoose'),
		Schema = mongoose.schema;


const requestSchema = new mongoose.Schema({
	propertyId: String,
	propertyAddress: String,
	userId: String,
	agentId: String,
	created: Date,
	accepted: {type: Boolean, required: true},
	completed: {type: Boolean, required: true},
	requestedDate: Date
})

module.exports = mongoose.model('Request', requestSchema);