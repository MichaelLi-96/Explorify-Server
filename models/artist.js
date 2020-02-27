const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlbumPlaylist = require('./albumPlaylist');

const ArtistSchema = new Schema({
  name: {
   		type: String
  },
  imageUrl: {
  		type: String
  },
  albums: {
  		type: [AlbumPlaylist.schema]
  }
});

const Artist = mongoose.model('artist', ArtistSchema);
module.exports = Artist;