import express from 'express';
import auth from '../middlewares/auth.js';
import BookingRepository from '../repositories/bookingRepository.js';

const router = express.Router();
const bookingRepository = new BookingRepository();

router.get('/', auth, async (req, res) => {
  const { status, response } = await bookingRepository.getAll();
  res.status(status).json(response);
})

router.post('/', auth, async (req, res) => {
  const roomDoc = req.body;
  roomDoc.userId = req.user._id;
  const { status, response } = await bookingRepository.insert(roomDoc);
  res.status(status).json(response);
});

router.post('/get-capacity', auth, async (req, res) => {
  const doc = req.body;
  const { status, response } = await bookingRepository.getCapacity(doc);
  res.status(status).json(response);
});

router.get('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const { status, response } = await bookingRepository.get(id);
  res.status(status).json(response);
});

// router.put('/:id', auth, async (req, res) => {
//   const id = req.params.id;
//   const roomDoc = req.body;
//   const { status, response } = await bookingRepository.update(id, roomDoc);
//   res.status(status).json(response);
// });

// router.delete('/:id', auth, async (req, res) => {
//   const id = req.params.id;
//   const { status, response } = await bookingRepository.delete(id);
//   res.status(status).json(response);
// });



export default router;