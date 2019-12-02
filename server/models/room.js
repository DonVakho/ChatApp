const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    roomName: String,
});

module.exports = mongoose.model('Room', RoomSchema);