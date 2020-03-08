const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// GET: Authenticate(Logging in) an User in the database, return a jwt that expires in 1 hr
router.get('/login', function(req, res) {
	const { email, password } = req.body;

	// Simple validation
	if(!email || !password) {
		return res.status(400).json({ msg: 'please enter all fields'});
	}

	// Check for existing user
	db.User.findOne({ email })
		.then(user => {
			if(!user) return res.status(400).json({ msg: 'user does not exist'});

			// Validate password
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if(!isMatch) return res.status(400).json({ msg: 'invalid credentials'});

					jwt.sign(
						{ userId: user._id },
						config.get('jwtSecret'),
						{ expiresIn: 3600 },
						(err, token) => {
							if(err) throw err;
							res.status(200).json({
								token: token
							});
						}
					)

				})

		})
})

// GET: Decode a jwt, return the decoded information
router.get('/decodeJwt', function(req, res) {
	const { token } = req.body;

	if(!token) return res.status(401).json({ msg: 'no token to decode' });

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		return res.status(200).json(decoded);
	} catch(e) {
		res.status(400).json({ meg: 'token is not valid or has expired' });
	}
})

module.exports = router;