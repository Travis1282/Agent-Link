const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const Homes = require('../models/homes.js');
const Request = require('../models/requestModel.js');

router.route('/')
	// Render the search page for the user at the /home/ route
	.get((req,res)=>{
		Homes.find({},(err, foundHouses) => {
			res.render('search.ejs',{
				houses: foundHouses,
				signedIn: req.session.loggedIn

			})
		})
	})
	.post((req,res)=>{
		// Finds all the homes that match the users options
		Homes.find({$and:[

			{neighborhood: req.body.chicagoNeighborhood},
			{bedrooms: { $gte: parseInt(req.body.hiddenMinBed) }},
			{bedrooms: { $lte: parseInt(req.body.hiddenMaxBed) }},
			{bathrooms: { $gte: parseInt(req.body.hiddenMinBath) }},
			{bathrooms: { $lte: parseInt(req.body.hiddenMaxBath) }},
			{sqft: { $gte: parseInt(req.body.hiddenMinSqft) }},
			{sqft: { $lte: parseInt(req.body.hiddenMaxSqft) }}

							]},(err,foundHomes) => {
			// Render a page showing all the found homes for the user
			res.render('showmany.ejs',{

				homes: foundHomes,
				signedIn: req.session.loggedIn
			})
		})
	})

	
router.route('/:id')
	.get((req,res)=>{
		Homes.findById(req.params.id,(err,foundHome)=>{
			res.render('show.ejs',{
				home: foundHome,
				signedIn: req.session.loggedIn
			})

		})
	})
	.post((req,res)=>{
		// Find the user who requested the showing
		User.findOne({email: req.session.email}, (err,found)=>{
			// Create a request to view the home
			const showingRequest = {
				propertyId: req.params.id,
				userId: found.id,
				created: new Date(),
				accepted: false,
				completed: false
			}
			Request.create(showingRequest,(err,created)=>{
				// Push the created request into the users list of requests
				found.requestedProperties.push(created);
				// Save the changed user
				found.save((err)=>{
					if (err) {
						return handleError(err)
					} else {
						res.redirect('/user/profile')
					}
				});
			})
		})
	})
	.delete((req,res)=>{	
		// Find the user who made this request
		User.find({email: req.session.email}, (err,foundUser)=>{
			// Loop through users array containing all the requested showings
			for (let i = 0; i < foundUser[0].requestedProperties.length; i++) {
				// Remove the request whos id matches req.params.id
				if (foundUser[0].requestedProperties[i].id == req.params.id) {
					foundUser[0].requestedProperties.splice(i,1);
				};
			};
			foundUser[0].save((err)=>{
				// Now remove the request from the requests database
				Request.findByIdAndRemove(req.params.id,(err,foundRequest)=>{
					if (err) {
						console.log(err);
					} else res.redirect('/user/profile');
				});
			});
		});
	});

	

module.exports = router;