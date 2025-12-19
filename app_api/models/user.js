// FILE: app_api/models/user.js   (REPLACE ENTIRE FILE)
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  name:  { type: String, required: true },
  hash:  { type: String, required: true }
});

// why: never store plain text; hash on set; verify on login
userSchema.methods.setPassword = async function (password) {
  this.hash = await bcrypt.hash(password, 10);
};
userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.hash);
};

// safe re-use if file is required more than once
module.exports = mongoose.models.users || mongoose.model('users', userSchema);
