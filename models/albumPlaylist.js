const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Song = require('./song');

const albumPlaylistSchema = new Schema({
  name: {
  	type: String
  },
  isAlbum: {
  	type: Boolean,
    default: true
  },
  imageUrl: {
  	type: String
  },
  artist: {
  	type: String
  },
  year: {
  	type: String
  },
  songs: [{
  	type: Schema.Types.ObjectId,
  	ref: 'Song'
  }]
});

const AlbumPlaylist = mongoose.model('albumPlaylist', albumPlaylistSchema);
module.exports = AlbumPlaylist;