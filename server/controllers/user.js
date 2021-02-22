import express from 'express';
import UserRepository from '../repositories/userRepository.js';

const router = express.Router();
const userRepository = new UserRepository();

router.get('/', async (req, res) => {
  const { status, response } = await userRepository.getAll();
  res.status(status).json(response);
})

// router.post('/', async (req, res) => {
//   const roomDoc = req.body;
//   const { status, response } = await userRepository.insert(roomDoc);
//   res.status(status).json(response);
// });

router.post('/register', async (req, res) => {
  const doc = req.body;
  const { status, response } = await userRepository.register(doc);
  res.status(status).json(response);
});

router.post('/login', async (req, res) => {
  const doc = req.body;
  const { status, response } = await userRepository.login(doc);
  res.status(status).json(response);
});

// router.get('/:id', async (req, res) => {
//   const id = req.params.id;
//   const { status, response } = await userRepository.get(id);
//   res.status(status).json(response);
// });

// router.put('/:id', async (req, res) => {
//   const id = req.params.id;
//   const roomDoc = req.body;
//   const { status, response } = await userRepository.update(id, roomDoc);
//   res.status(status).json(response);
// });

// router.delete('/:id', async (req, res) => {
//   const id = req.params.id;
//   const { status, response } = await userRepository.delete(id);
//   res.status(status).json(response);
// });

export default router;