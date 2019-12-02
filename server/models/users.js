const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userName: String,
    password: String,
    roomId: String
});

module.exports = mongoose.model('User', UserSchema);