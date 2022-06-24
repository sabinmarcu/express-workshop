import { hasFlag } from '../utils/flags.js';

export const hasRoles = (...roles) => (req, res, next) => {
  if (hasFlag(req, 'bypassRegister')) {
    return next();
  }
  const { auth } = req;
  if (!auth) {
    return res.status(401).send('Unauthorized');
  }
  if (!roles.includes(auth.role)) {
    return res.status(403).send('Forbidden');
  }
  return next();
};
