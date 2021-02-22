import Repository from './repository.js';
import Room from '../models/room.js';

class RoomRepository extends Repository {
  constructor() {
    super(Room);
  }
}

export default RoomRepository;

