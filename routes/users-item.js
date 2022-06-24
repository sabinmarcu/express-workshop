import bodyParser from 'body-parser';
import { Router } from 'express';
import { extractEntity } from '../middlewares/extractEntity.js';
import { byId, remove, update } from '../models/users.js';
import { makeLogger } from '../utils/makeLogger.js';
import { createUpdateSchema } from '../validation/users.js';
import { validator } from '../utils/validator.js';

const debug = makeLogger('router:users-item');

export const usersItemRouter = new Router({ mergeParams: true });
usersItemRouter.use([extractEntity('user', byId), bodyParser.json()]);

const routes = [
  ['get', '/', (req, res) => res.json(req.user)],
  ['patch', '/', validator.body(createUpdateSchema), (req, res) => {
    const { id } = req.params;
    return res.json(update(id, req.body));
  }],
  ['delete', '/', (req, res) => {
    const { id } = req.params;
    return res.json(remove(id));
  }],
];

for (const [method, route, ...rest] of routes) {
  debug.info(`Mounting ${method.toUpperCase()} ${route}`);
  usersItemRouter[method](route, ...rest);
}
