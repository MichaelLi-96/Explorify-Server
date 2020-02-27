const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/explorify';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('MongoDB is connected.'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

module.exports = {
  AlbumPlaylist: require('./albumPlaylist'),
  Artist: require('./artist'),
  Song: require('./song'),
  User: require('./user')
}