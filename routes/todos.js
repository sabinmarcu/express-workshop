import bodyParser from 'body-parser';
import { Router } from 'express';
import { byStatus, create, list } from '../models/todos.js';
import { makeLogger } from '../utils/makeLogger.js';
import { todosItemRouter } from './todos-item.js';

const debug = makeLogger('router:todos');

export const todosRouter = new Router();

const routes = [
  // Get list of todos
  ['get', '/', (req, res) => {
    const { done } = req.query;
    debug.debug(`Getting users (query: '${done}')`);
    if (typeof done === 'undefined') {
      return res.json(list());
    }
    if (!['true', 'false'].includes(done)) {
      return res.status(406).send('Nah');
    }
    return res.json(byStatus(done === 'true'));
  }],

  // Create a new todo
  ['post', '/', bodyParser.json(), (req, res) => {
    const { title } = req.body;
    const newTodo = create(title);
    return res.send(newTodo);
  }],
];

debug.info('Mounting todos-item under /:id');
todosRouter.use('/:id', todosItemRouter);

for (const [method, route, ...rest] of routes) {
  debug.info(`Mounting ${method.toUpperCase()} ${route}`);
  todosRouter[method](route, ...rest);
}
