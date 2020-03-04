const express = require('express');
const router = express.Router();
const db = require('../models');

// GET: Retrieve the list of songs
router.get('/', function(req, res) {
	db.Song.find(function(err, song) {
		if(err) {
			console.log(err);
		}
		else {
			res.json(song);
		}
	});
})

// GET: Retrieve one specific song based on id
router.get('/:id', (function(req, res) {
	let id = req.params.id;
	db.Song.findById(id, function(err, song) {
		res.json(song);
	});
}))

// POST: Add an song to the database
router.post('/add', function(req, res) {
	let song = new db.Song(req.body);
	song.save()
		.then(song => {
			res.status(200).json({'song': 'song added successfully'})
		})
		.catch(err => {
			res.status(400).send('adding new song failed');
		})
})

// PUT: Modify information of an specific song based on id
router.put('/update/:id', function(req, res) {
	db.Song.findById(req.params.id, function(err, song) {
		if(!song) {
			res.status(404).send('data is not found');
		}
		else {
			song.name = req.body.name;
			song.albumPlaylist = req.body.albumPlaylist;
			song.artist = req.body.artist;
			song.url = req.body.url;
			song.imageUrl = req.body.imageUrl;
			song.length = req.body.length;
			song.plays = req.body.plays;

			song.save()
				.then(song => {
					res.json('song updated');
				})
				.catch(err => {
					res.status(400).send('update not possible');
				})
		}
	})
})

module.exports = router;