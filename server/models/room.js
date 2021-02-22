import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  space: {
    type: Number,
    required: true
  }
}, { collection: 'rooms' });

const Room = mongoose.model('RoomModel', RoomSchema);

export default Room;