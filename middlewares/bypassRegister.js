import { flag } from '../utils/flags.js';

export const bypassRegister = (req, res, next) => {
  const [host, port] = (req.get('origin') || '').split(':');
  if (host === 'localhost' && port === '3000') {
    flag(req, 'bypassRegister', true);
  }
  next();
};
