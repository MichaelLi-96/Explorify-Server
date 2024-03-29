const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// GET: Retrieve the list of Users
router.get('/', function (req, res) {
  db.User.find(function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});

// GET: Retrieve one specific User based on id
router.get('/:id', function (req, res) {
  let id = req.params.id;
  db.User.findById(id, function (err, user) {
    res.json(user);
  });
});

// POST: Add an User to the database, returns a jwt that expires in 1 hr
router.post('/add', function (req, res) {
  const { email, password, name } = req.body;

  // Simple validation
  if (!email || !password || !name) {
    return res.status(400).json({ msg: 'Please enter all fields.' });
  }

  // Check for existing user
  db.User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: 'This email has already been used.' });

    let newUser = new db.User(req.body);

    // Create salt & hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        newUser
          .save()
          .then((user) => {
            jwt.sign({ userId: user._id }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
              if (err) throw err;

              res.status(200).json({
                token: token
              });
            });
          })
          .catch((err) => {
            return res.status(400).json({ msg: 'Adding new user has failed.' });
          });
      });
    });
  });
});

// PUT: Modify information of a specific User based on id
router.put('/update/:id', function (req, res) {
  db.User.findById(req.params.id, function (err, user) {
    if (!user) {
      res.status(404).send('data is not found');
    } else {
      user.email = req.body.email;

      // Create salt & hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
        });
      });

      user.name = req.body.name;
      user.albumPlaylists = req.body.albumPlaylists;

      user
        .save()
        .then((user) => {
          res.json({ msg: 'user updated' });
        })
        .catch((err) => {
          res.status(400).send('update not possible');
        });
    }
  });
});

// DELETE: Delete a specific User based on id
router.delete('/delete/:id', function (req, res) {
  db.User.remove(
    {
      _id: req.params.id
    },
    function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.json({ msg: 'user successfully deleted' });
      }
    }
  );
});

module.exports = router;
