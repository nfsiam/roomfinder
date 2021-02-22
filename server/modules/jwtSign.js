import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const getSignedToken = (user) => {
  return jwt.sign(user, process.env.JWTSECRET, { expiresIn: '3d' });
}

export default getSignedToken;