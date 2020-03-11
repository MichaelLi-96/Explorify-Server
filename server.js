const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const config = require('config');
const PORT = process.env.PORT || 4000;

//DB config
const serverDb = config.get('serverMongoURI');
const localDb = config.get('localMongoURI');

app.use(bodyParser.json());
const corsOptions = {
  origin: ['https://explorifyy.herokuapp.com'],
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

mongoose.connect( serverDb || localDb, { useNewUrlParser: true });
// const connection = mongoose.connection;
// connection.once('open', function() {
// 	console.log("MongoDB database connection established successfully");
// })

app.get('/', (req,res) => res.send(`<h1>Explorify server is running...</h1>`));

app.use('/songs', routes.song);
app.use('/albumPlaylists', routes.albumPlaylist);
app.use('/artists', routes.artist);
app.use('/users', routes.user);
app.use('/auth', routes.auth);

app.listen(PORT, function() {
	console.log("Server is running on Port: " + PORT);
});