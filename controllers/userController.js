const	express = require('express'),
		router = express.Router(),
		User = require('../models/userModel.js'),
		Agent = require('../models/agentModel.js'),
		bcrypt = require('bcrypt');

router.route('/login')
	.get((req,res)=>{
		res.render('login.ejs', {
			message: req.session.message,
			signedIn: req.session.loggedIn
		})
	})
	.post((req,res)=>{
		User.findOne({email: req.body.email}, (err,userFound)=>{/// check user collecion 
			if (userFound){
				//compare passwords
				if (bcrypt.compareSync(req.body.password, userFound.password)) {
					req.session.email = req.body.email;
					req.session.loggedIn = true;
					res.redirect('/home')
				} else { // passwords didnt match
					req.session.message = "Incorrect email or password";
					res.redirect('/user/login');
				}
			} else {
				Agent.findOne({email: req.body.email}, (err,agentFound)=>{// check agent collection
				if (agentFound){
					//compare passwords
					if (bcrypt.compareSync(req.body.password, userFound.password)) {
						req.session.email = req.body.email;
						req.session.loggedIn = true;

						res.redirect('/home')
					} else { // passwords didnt match
						req.session.message = "Incorrect email or password";
						res.redirect('/user/login');
					}
				} else {
					req.session.message = "Incorrect email or password";
					res.redirect('/user/login');
				}
			})
			}
		})
	})

router.route('/logout')
	.get((req,res)=>{
		req.session.destroy((err)=>{
			if (err){
				console.log('broke');
			} else {
				res.redirect('/user/login');
			}
		})
	})

router.route('/register')
	.get((req,res)=>{
		res.render('register.ejs',{message: false}) // Add option to see if user is already registered
	})
	.post((req,res)=>{
		//add user to db and redirect to home
		const password = req.body.password;
		const hashword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
		const newDbEntry = {
			fullname: req.body.fullname,
			email: req.body.email,
			password: hashword,	
		}

		User.create(newDbEntry, (err,created)=>{
			if (err){
				res.render('register.ejs',{message: true});
			} else {
				res.redirect('/user/login');
			}
		})
	})

router.route('/profile')
	.get((req,res)=>{
		User.findOne({email: req.session.email},(err,found)=>{
			console.log(found);
			res.render('userProfile.ejs', {
				requests: found.requestedProperties,
				signedIn: req.session.loggedIn
			})
		})
		
	})


module.exports  = router;

















