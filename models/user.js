const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    default: "https://static.change.org/profile-img/default-user-profile.svg"
  },
  birthday: {
    type: Date,
    default: Date.now,
  }
})

const User = mongoose.model('user', userSchema);
module.exports = User;