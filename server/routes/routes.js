import room from '../controllers/room.js';
import user from '../controllers/user.js';
import booking from '../controllers/booking.js';

const routes = (app) => {
  app.use('/api/rooms', room);
  app.use('/api/users', user);
  app.use('/api/bookings', booking);
}

export default routes;