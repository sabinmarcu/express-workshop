import bodyParser from 'body-parser';
import { Router } from 'express';
import { byCredentials } from '../models/users.js';
import { createToken } from '../services/auth.js';
import { makeLogger } from '../utils/makeLogger.js';
import { validator } from '../utils/validator.js';
import { loginSchema } from '../validation/users.js';

const debug = makeLogger('router:auth');

export const authRouter = new Router();

const routes = [
  ['post', '/login', bodyParser.json(), validator.body(loginSchema), (req, res) => {
    const user = byCredentials(req.body);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = createToken(user);
    return res.send(token);
  }],
  ['post', '/logout', (req, res) => res.send('Logout')],
  ['post', '/register', (req, res) => res.send('Register')],
];

for (const [method, route, ...rest] of routes) {
  debug.info(`Mounting ${method.toUpperCase()} ${route}`);
  authRouter[method](route, ...rest);
}
