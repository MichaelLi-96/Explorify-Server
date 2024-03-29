const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// POST: Authenticate(Logging in) an User in the database, return a jwt that expires in 1 hr
router.post('/login', function (req, res) {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields.' });
  }

  // Check for existing user
  db.User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: 'This user does not exist.' });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: 'Incorrect password.' });

      jwt.sign({ userId: user._id }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token: token
        });
      });
    });
  });
});

// POST: Decode a jwt, return the decoded information
router.post('/decodeJwt', function (req, res) {
  const { token } = req.body;

  if (!token) return res.status(401).json({ msg: 'No token to decode.' });

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    return res.status(200).json(decoded);
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid or has expired.' });
  }
});

module.exports = router;
