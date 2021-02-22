import Repository from './repository.js';
import User from '../models/user.js';
import { Response, ResponseX } from '../models/responseModels/responseModels.js';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import getSignedToken from '../modules/jwtSign.js';
import { getHashedPass, matchHashedPass } from '../modules/hashPass.js';

class RoomRepository extends Repository {
  constructor() {
    super(User);
  }
  register = async (document) => {
    const { username, password } = document;
    try {
      const userCount = await this.Model.countDocuments({ username: username });
      if (userCount > 0) {
        return new ResponseX(StatusCodes.CONFLICT, 'Username already exixts');
      }

      const hashedPass = await getHashedPass(password);

      const user = await new this.Model({ username, password: hashedPass });

      await user.save();

      const token = getSignedToken({ username, _id: user._id });
      const tokenObj = { username, token };
      return new Response(StatusCodes.CREATED, tokenObj);
    } catch (error) {
      return new ResponseX(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  };

  login = async (document) => {
    const { username, password } = document;
    try {
      const user = await this.Model.findOne({ username: username });
      if (user) {
        const matched = await matchHashedPass(password, user.password);
        if (matched) {
          //token
          const token = getSignedToken({ username, _id: user._id });
          const tokenObj = { username, token };
          return new Response(StatusCodes.OK, tokenObj);
        }
        else {
          return new ResponseX(StatusCodes.NOT_FOUND, 'User not found');
        }
      }
      else {
        return new ResponseX(StatusCodes.NOT_FOUND, 'User not found');
      }
    } catch (error) {
      return new ResponseX(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  }
}

export default RoomRepository;

