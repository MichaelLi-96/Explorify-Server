const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/explorify', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
	console.log("MongoDB database connection established successfully");
})

app.use('/songs', routes.song);
app.use('/albumPlaylists', routes.albumPlaylist);
app.use('/artists', routes.artist);

app.listen(PORT, function() {
	console.log("Server is running on Port: " + PORT);
});