import { byId } from '../models/users.js';
import { validateToken } from '../services/auth.js';
import { hasFlag } from '../utils/flags.js';

export const extractUser = (req, res, next) => {
  if (hasFlag(req, 'bypassRegister')) {
    return next();
  }
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send('Unauthorized');
  }
  const [, token] = authorization.split(' ');
  const decodedToken = validateToken(token);
  if (!decodedToken) {
    return res.status(401).send('Unauthorized');
  }
  req.auth = byId(decodedToken.user);
  return next();
};
