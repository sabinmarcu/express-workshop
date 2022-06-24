import bodyParser from 'body-parser';
import { Router } from 'express';
import { extractEntity } from '../middlewares/extractEntity.js';
import { byId, remove, update } from '../models/todos.js';
import { makeLogger } from '../utils/makeLogger.js';
import { updateSchema } from '../validation/todos.js';
import { validator } from '../utils/validator.js';
import { extractUser } from '../middlewares/extractUser.js';
import { hasRoles } from '../middlewares/hasRoles.js';

const debug = makeLogger('router:todos-item');

export const todosItemRouter = new Router({ mergeParams: true });
todosItemRouter.use([extractEntity('todo', byId), bodyParser.json()]);

const routes = [
  ['get', '/', (req, res) => res.json(req.todo)],
  ['patch', '/', extractUser, validator.body(updateSchema), hasRoles('manager', 'admin'), (req, res) => {
    const { id } = req.params;
    return res.json(update(id, req.body));
  }],
  ['delete', '/', extractUser, hasRoles('admin'), (req, res) => {
    const { id } = req.params;
    return res.json(remove(id));
  }],
];

for (const [method, route, ...rest] of routes) {
  debug.info(`Mounting ${method.toUpperCase()} ${route}`);
  todosItemRouter[method](route, ...rest);
}
