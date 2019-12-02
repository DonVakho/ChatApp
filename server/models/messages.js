const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    text: String,
    roomid: String,
    userid: String
});

module.exports = mongoose.model('Message', MessageSchema);