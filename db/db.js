const mongoose = require('mongoose');
const Homes = require('../models/homes.js');
const dummyData = require('../models/dummydata.js');

const mongoUri =  process.env.MONGODB_URI ||  'mongodb://localhost:27017/realestates';

mongoose.connect(mongoUri);

mongoose.connection.once('open', ()=>{
	console.log('Database connected on 27017');
})

mongoose.connection.on('disconnected', () => {
	console.log('database disconnected');
})

mongoose.connection.on('error', () => {
	console.log('there was an error connecting', error);
})

Homes.find({}, (err, data) => {
	console.log(data.length + " records in database")
	if(data.length == 0) {
		Homes.collection.insertMany(dummyData, (err, data) => {
		    console.log("\n\n\ninserted " + data.insertedCount + " records");
		});
	}
})

