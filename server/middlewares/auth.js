import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }

  jwt.verify(token, process.env.JWTSECRET, (err, user) => {
    if (err) return res.status(StatusCodes.FORBIDDEN).send(err);
    req.user = user;
    next();
  })
}

export default auth;