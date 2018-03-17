const 	express = require('express'),
		router = express.Router(),
		User = require('../models/userModel.js'),
		Agent = require('../models/agentModel.js'),
		bcrypt = require('bcrypt');



router.route('/logout')
	.get((req,res)=>{
		req.session.destroy((err)=>{
			if (err){
				console.log('broke');
			} else {
				res.redirect('login');
			}
		})
	})


router.route('/register')
	.get((req,res)=>{
		res.render('agentRegister.ejs',{
		message: false,
		}) 
	}) 
	.post((req,res)=>{
		//add user to db and redirect to home
		const password = req.body.password;
		const hashword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
		const newDbEntry = {
			fullname: req.body.fullname,
			email: req.body.email,
			password: hashword	
		}

		Agent.create(newDbEntry, (err,created)=>{
			if (err){
				res.render('agentRegister.ejs',{message: true,
					signedIn: req.session.loggedIn
				});
			} else {
				res.redirect('/user/login', 
										{signedIn: req.session.loggedIn});
			}
		})
	})

module.exports  = router;