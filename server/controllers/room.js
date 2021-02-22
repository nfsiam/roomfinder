import express from 'express';
import auth from '../middlewares/auth.js';
import RoomRepository from '../repositories/roomRepository.js';

const router = express.Router();
const roomRepository = new RoomRepository();

router.get('/', auth, async (req, res) => {
  const { status, response } = await roomRepository.getAll();
  res.status(status).json(response);
})

// router.post('/', async (req, res) => {
//   const roomDoc = req.body;
//   const { status, response } = await roomRepository.insert(roomDoc);
//   res.status(status).json(response);
// });

// router.get('/:id', auth, async (req, res) => {
//   const id = req.params.id;
//   const { status, response } = await roomRepository.get(id);
//   res.status(status).json(response);
// });

// router.put('/:id', auth, async (req, res) => {
//   const id = req.params.id;
//   const roomDoc = req.body;
//   const { status, response } = await roomRepository.update(id, roomDoc);
//   res.status(status).json(response);
// });

// router.delete('/:id', auth, async (req, res) => {
//   const id = req.params.id;
//   const { status, response } = await roomRepository.delete(id);
//   res.status(status).json(response);
// });

export default router;