import Repository from './repository.js';
import User from '../models/user.js';
import Booking from '../models/booking.js';
import Room from '../models/room.js';
import { Response, ResponseX } from '../models/responseModels/responseModels.js';

import {
  ReasonPhrases,
  StatusCodes
} from 'http-status-codes';

class BookingRepository extends Repository {
  constructor() {
    super(Booking);
  }
  insert = async (document) => {
    try {
      const { userId, roomId, ...rest } = document;

      // * Check Workspace Availability before booking

      const bookingCount = await this.Model.count({ date: rest.date, room: roomId });

      const room = await Room.findById(roomId);

      if (bookingCount >= room.space) {
        const bookings = await this.Model.find({ date: rest.date, room: roomId }).select({ _id: 0, name: 1 });
        const allRooms = await Room.find({});

        const availableRoomInfo = [];

        for (let i = 0; i < allRooms.length; i++) {
          const bookingCount = await this.Model.countDocuments({ date: rest.date, room: allRooms[i]._id });
          // console.log(bookingCount, allRooms[i].space);
          if (bookingCount < allRooms[i].space) {
            availableRoomInfo.push({
              name: allRooms[i].name,
              available: (allRooms[i].space - bookingCount)
            });
          }
        }

        return new Response(StatusCodes.NOT_ACCEPTABLE, { bookings, availableRoomInfo });
      }

      //* If space available then proceed booking

      const user = await User.findById(userId);

      const booking = new Booking(document);

      await user.bookings.push(booking);
      await user.save();

      booking.user = user;
      booking.room = room;

      await booking.save();

      return new Response(StatusCodes.CREATED, booking);

    } catch (error) {
      return new Response(StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
  }

  getCapacity = async (document) => {
    const { date } = document;
    try {
      const spaces = await Room.aggregate([{
        $match: {}
      }, {
        $group: {
          _id: null,
          count: {
            $sum: '$space'
          }
        }
      }]);

      const bookingCount = await this.Model.count({ date: date });

      return new Response(StatusCodes.OK, { spaces: spaces[0].count, bookingCount });

    } catch (error) {

      return new Response(StatusCodes.INTERNAL_SERVER_ERROR, error);
    }


  };
}

export default BookingRepository;

