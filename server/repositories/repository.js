import {
  ReasonPhrases,
  StatusCodes
} from 'http-status-codes';
import { Response, ResponseX } from '../models/responseModels/responseModels.js';

class Repository {
  Model;
  constructor(Model) {
    this.Model = Model;
  }
  getAll = async () => {
    try {
      const result = await this.Model.find({});
      return new Response(StatusCodes.OK, result);
    }
    catch (error) {
      return new ResponseX(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  };

  get = async (id) => {
    try {
      const result = await this.Model.findById(id);
      if (result === null)
        return new ResponseX(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
      else
        return new Response(StatusCodes.OK, result);
    }
    catch (error) {
      if (error.kind === 'ObjectId')
        return new ResponseX(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
      else
        return new ResponseX(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  };
  insert = async (document) => {
    try {
      const result = await this.Model.create(document);
      return new Response(StatusCodes.CREATED, result);
    } catch (error) {
      return new ResponseX(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  };

  update = async (_id, document) => {
    try {
      const result = await this.Model.updateOne({ _id }, document);
      if (result.n >= 1)
        return new ResponseX(StatusCodes.OK, 'Updated Successfully');
      else
        return new ResponseX(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
    }
    catch (error) {
      if (error.kind === 'ObjectId')
        return new ResponseX(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
      else
        return new Response(StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
  }

  delete = async (_id) => {
    try {
      const result = await this.Model.deleteOne({ _id });
      return new ResponseX(StatusCodes.OK, 'Deleted Successfully');
    }
    catch (error) {
      return new ResponseX(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  };
}

export default Repository;