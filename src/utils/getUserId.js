import jwt from 'jsonwebtoken';

const getUserId = (request, requireAuth = true) => {
  const { headers: { authorization } } = request;
  console.log(authorization);
  if (authorization) {
    const token = authorization.replace('Bearer ', '');

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