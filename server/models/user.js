import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookingModel',
  }]
}, { collection: 'users' });

const User = mongoose.model('UserModel', UserSchema);

export default User;