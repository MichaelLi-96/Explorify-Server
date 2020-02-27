const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: {
   	type: String
  },
  artist: {
  	type: String
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