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
  albumPlaylists: [{
    type: Schema.Types.ObjectId,
    ref: 'AlbumPlaylist'
  }]
});

const Artist = mongoose.model('artist', ArtistSchema);
module.exports = Artist;