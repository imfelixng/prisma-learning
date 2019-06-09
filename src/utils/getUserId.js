import jwt from 'jsonwebtoken';

const getUserId = (request) => {
  const { headers: { authorization } } = request;

  if (!authorization) {
    throw new Error('Authentication is required');
  }

  const token = authorization.replace('Bearer ', '');

  const decoded = jwt.verify(token, 'mysupersecret');

  return decoded.userId;
}

export {
  getUserId as default
}