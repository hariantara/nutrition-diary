var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nutrition');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  role: String,
  salt: String,
  createdAt: Date,
  updatedAt: Date
});

var userModels = mongoose.model('user', userSchema);

module.exports = userModels
