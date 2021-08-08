const express = require('express');
const router = express.Router();
const db = require('../models');

// GET: Retrieve the list of Artists
router.get('/', function (req, res) {
  db.Artist.find(function (err, artist) {
    if (err) {
      console.log(err);
    } else {
      res.json(artist);
    }
  });
});

// GET: Retrieve one specific Artist based on id
router.get('/:id', function (req, res) {
  let id = req.params.id;
  db.Artist.findById(id, function (err, artist) {
    res.json(artist);
  });
});

// POST: Add an Artist to the database
router.post('/add', function (req, res) {
  let artist = new db.Artist(req.body);
  artist
    .save()
    .then((artist) => {
      res.status(200).json({ msg: 'artist added successfully' });
    })
    .catch((err) => {
      res.status(400).send('adding new artist failed');
    });
});

// PUT: Modify information of a specific Artist based on id
router.put('/update/:id', function (req, res) {
  db.Artist.findById(req.params.id, function (err, artist) {
    if (!artist) {
      res.status(404).send('data is not found');
    } else {
      artist.name = req.body.name;
      artist.imageUrl = req.body.imageUrl;
      artist.albumPlaylists = req.body.albumPlaylists;

      artist
        .save()
        .then((artist) => {
          res.json({ msg: 'artist updated' });
        })
        .catch((err) => {
          res.status(400).send('update not possible');
        });
    }
  });
});

// DELETE: Delete a specific Artist based on id
router.delete('/delete/:id', function (req, res) {
  db.Artist.remove(
    {
      _id: req.params.id
    },
    function (err, artist) {
      if (err) {
        console.log(err);
      } else {
        res.json({ msg: 'artist successfully deleted' });
      }
    }
  );
});

module.exports = router;
