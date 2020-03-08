const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const config = require('config');
const PORT = 4000;

//DB config
const db = config.get('mongoURI');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(db, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
	console.log("MongoDB database connection established successfully");
})

app.use('/songs', routes.song);
app.use('/albumPlaylists', routes.albumPlaylist);
app.use('/artists', routes.artist);
app.use('/users', routes.user);

app.listen(PORT, function() {
	console.log("Server is running on Port: " + PORT);
});