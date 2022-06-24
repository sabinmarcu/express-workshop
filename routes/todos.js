import bodyParser from 'body-parser';
import { Router } from 'express';
import { byStatus, create, list } from '../models/todos.js';
import { makeLogger } from '../utils/makeLogger.js';
import { validator } from '../utils/validator.js';
import { createSchema, getSchema } from '../validation/todos.js';
import { todosItemRouter } from './todos-item.js';

const debug = makeLogger('router:todos');

export const todosRouter = new Router();

const routes = [
  // Get list of todos
  ['get', '/', validator.query(getSchema), (req, res) => {
    const { done } = req.query;
    debug.debug(`Getting todos (query: '${done}')`);
    if (typeof done === 'undefined') {
      return res.json(list());
    }
    const doneInput = done === 'true';
    return res.json(byStatus(doneInput));
  }],

  // Create a new todo
  ['post', '/', bodyParser.json(), validator.body(createSchema), (req, res) => {
    const newTodo = create(req.body);
    return res.send(newTodo);
  }],
];

debug.info('Mounting todos-item under /:id');
todosRouter.use('/:id', todosItemRouter);

for (const [method, route, ...rest] of routes) {
  debug.info(`Mounting ${method.toUpperCase()} ${route}`);
  todosRouter[method](route, ...rest);
}
