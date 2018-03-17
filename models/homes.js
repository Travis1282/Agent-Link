const mongoose = require('mongoose');
const Schema = mongoose.schema;

const homeSchema = new mongoose.Schema({
	neighborhood: String,
	bedrooms: Number,
	bathrooms: Number,
	img: String,
	address: String,
	address2: String
})

module.exports = mongoose.model('Home', homeSchema);