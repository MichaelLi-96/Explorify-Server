const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// POST: Authenticate(Logging in) an User in the database
router.post('/', function(req, res) {
	const { email, password } = req.body;

	// Simple validation
	if(!email || !password) {
		return res.status(400).json({ 'msg': 'please enter all fields'});
	}

	// Check for existing user
	db.User.findOne({ email })
		.then(user => {
			if(!user) return res.status(400).json({ 'msg': 'user does not exist'});

			// Validate password
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if(!isMatch) return res.status(400).json({ 'msg': 'invalid credentials'});

					jwt.sign(
						{ id: user._id },
						config.get('jwtSecret'),
						{ expiresIn: 3600 },
						(err, token) => {
							if(err) throw err;

							res.status(200).json({
								token,
								user: {
									id: user._id,
									email: user.email,
									name: user.name
								}
							});
						}
					)

				})

		})
})

module.exports = router;