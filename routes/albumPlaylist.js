const express = require('express');
const router = express.Router();
const db = require('../models');

// GET: Retrieve the list of AlbumPlaylists
router.get('/', function(req, res) {
	db.AlbumPlaylist.find(function(err, albumPlaylist) {
		if(err) {
			console.log(err);
		}
		else {
			res.json(albumPlaylist);
		}
	});
})

// GET: Retrieve one specific AlbumPlaylist based on id
router.get('/:id', (function(req, res) {
	let id = req.params.id;
	db.AlbumPlaylist.findById(id, function(err, albumPlaylist) {
		res.json(albumPlaylist);
	}).populate({
		path: 'songs',
		model: db.Song
	})
}))

// POST: Add an AlbumPlaylist to the database
router.post('/add', function(req, res) {
	let albumPlaylist = new db.AlbumPlaylist(req.body);
	albumPlaylist.save()
		.then(albumPlaylist => {
			res.status(200).json({'albumPlaylist': 'albumPlaylist added successfully'});
		})
		.catch(err => {
			res.status(400).send('adding new albumPlaylist failed');
		})
})

// PUT: Modify information of a specific AlbumPlaylist based on id
router.put('/update/:id', function(req, res) {
	db.AlbumPlaylist.findById(req.params.id, function(err, albumPlaylist) {
		if(!albumPlaylist) {
			res.status(404).send('data is not found');
		}
		else {
			albumPlaylist.name = req.body.name;
			albumPlaylist.isAlbum = req.body.artist;
			albumPlaylist.imageUrl = req.body.imageUrl;
			albumPlaylist.artist = req.body.artist;
			albumPlaylist.year = req.body.year;
			albumPlaylist.songs = req.body.songs;

			albumPlaylist.save()
				.then(albumPlaylist => {
					res.json('albumPlaylist updated');
				})
				.catch(err => {
					res.status(400).send('update not possible');
				})
		}
	})
})

// DELETE: Delete a specific AlbumPlaylist based on id
router.delete('/delete/:id', function(req, res) {
	db.AlbumPlaylist.remove({
		_id: req.params.id
	}, function(err, albumPlaylist) {
		if(err) {
			console.log(err);
		}
		else {
			res.json({ message: 'Successfully deleted' }); }
	});
}); 

module.exports = router;