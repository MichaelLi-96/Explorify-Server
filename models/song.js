const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlbumPlaylist = require('./albumPlaylist');
const Artist = require('./artist');

const songSchema = new Schema({
  name: {
    type: String
  },
  albumPlaylist: {
    type: Schema.Types.ObjectId,
    ref: 'AlbumPlaylist'
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  },
  url: {
    type: String
  },
  imageUrl: {
    type: String
  },
  length: {
    type: String
  },
  plays: {
    type: Number
  }
});

const Song = mongoose.model('song', songSchema);
module.exports = Song;
