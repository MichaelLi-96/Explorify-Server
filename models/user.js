const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlbumPlaylist = require('./albumPlaylist');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  albumPlaylists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'AlbumPlaylist'
    }
  ]
});

const User = mongoose.model('user', userSchema);
module.exports = User;
