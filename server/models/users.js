const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userName: String,
    password: String,
    roomId: String,
    lastActive: String
});

module.exports = mongoose.model('User', UserSchema);