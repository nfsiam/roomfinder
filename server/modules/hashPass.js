import bcrypt from 'bcrypt';

const saltRounds = 10;

export const getHashedPass = async (password) => {
  return await bcrypt.hash(password, saltRounds);
}
export const matchHashedPass = async (password, hash) => {
  return await bcrypt.compare(password, hash);
}