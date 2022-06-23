import { Router } from 'express';
import { makeLogger } from '../utils/makeLogger.js';

const debug = makeLogger('router:auth');

export const authRouter = new Router();

const routes = [
  ['post', '/login', (req, res) => res.send('Login')],
  ['post', '/logout', (req, res) => res.send('Logout')],
  ['post', '/register', (req, res) => res.send('Register')],
];

for (const [method, route, ...rest] of routes) {
  debug.info(`Mounting ${method.toUpperCase()} ${route}`);
  authRouter[method](route, ...rest);
}
