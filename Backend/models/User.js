const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    phone: String,
    hospital: String,
});

const User = mongoose.model('Users', userSchema);

module.exports = User;