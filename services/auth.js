import jwt from 'jsonwebtoken';

const secret = 'superSecretKey';

export const createToken = (user) => {
  const payload = {
    user: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().getTime() + (60 * 60 * 1000), // 1 hour
  };
  return jwt.sign(payload, secret);
};

export const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    return false;
  }
};
