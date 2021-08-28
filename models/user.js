const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: Boolean, required: true }
});

module.exports = mongoose.model('User', userSchema);