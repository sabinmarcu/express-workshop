import bodyParser from 'body-parser';
import { Router } from 'express';
import {
  byRole,
  create,
  forbiddenFields,
  list,
} from '../models/users.js';
import { validator } from '../utils/validator.js';
import { makeLogger } from '../utils/makeLogger.js';
import { createSchema, getSchema } from '../validation/users.js';
import { usersItemRouter } from './users-item.js';
import { extractUser } from '../middlewares/extractUser.js';
import { hasRoles } from '../middlewares/hasRoles.js';

const debug = makeLogger('router:users');

export const usersRouter = new Router();
usersRouter.use([extractUser, hasRoles('admin')]);

export const sanitizeUser = (user) => {
  const sanitizedUser = {};
  for (const key in user) {
    if (
      !forbiddenFields.includes(key)
      && Object.hasOwnProperty.call(user, key)
    ) {
      sanitizedUser[key] = user[key];
    }
  }
  return sanitizedUser;
};

const routes = [
  // Get list of users
  ['get', '/', validator.query(getSchema), (req, res) => {
    const { role } = req.query;
    debug.debug(`Getting users (query: '${role}')`);
    if (typeof role === 'undefined') {
      return res.json(list().map(sanitizeUser));
    }
    return res.json(byRole(role).map(sanitizeUser));
  }],

  // Create a new users
  ['post', '/', extractUser, bodyParser.json(), validator.body(createSchema), (req, res) => {
    const newTodo = create(req.body);
    return res.send(newTodo);
  }],
];

for (const [method, route, ...rest] of routes) {
  debug.info(`Mounting ${method.toUpperCase()} ${route}`);
  usersRouter[method](route, ...rest);
}

debug.info('Mounting users-item under /:id');
usersRouter.use('/:id', usersItemRouter);
