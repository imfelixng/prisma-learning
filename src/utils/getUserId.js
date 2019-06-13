import jwt from 'jsonwebtoken';

const getUserId = (request, requireAuth = true) => {
  const header = request.request ? request.request.headers.authorization : request.connection.context.authorization

  if (header) {
    const token = header.replace('Bearer ', '');

    const decoded = jwt.verify(token, 'mysupersecret');
  
    return decoded.userId;

  }

  if (requireAuth) {
    throw new Error('Authentication is required');
  }

  return null;
  
}

export {
  getUserId as default
}