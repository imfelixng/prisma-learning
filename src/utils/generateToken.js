import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
  return jwt.sign(payload, 'mysupersecret', { expiresIn: '1d' })
}

export {
  generateToken as default
}