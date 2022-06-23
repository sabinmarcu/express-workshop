import bodyParser from 'body-parser';
import { Router } from 'express';
import { extractTodo } from '../middlewares/extractTodo.js';
import { remove, update } from '../models/todos.js';
import { makeLogger } from '../utils/makeLogger.js';

const debug = makeLogger('router:todos-item');

export const todosItemRouter = new Router({ mergeParams: true });
todosItemRouter.use([extractTodo, bodyParser.json()]);

const routes = [
  ['get', '/', (req, res) => res.json(req.todo)],
  ['patch', '/', (req, res) => {
    const { todo } = req;
    const { id } = req.params;
    const { title, done } = req.body;
    return res.json(update(id, {
      title: title || todo.title,
      done: typeof done === 'undefined' ? todo.done : done,
    }));
  }],
  ['delete', '/', (req, res) => {
    const { id } = req.params;
    return res.json(remove(id));
  }],
];

for (const [method, route, ...rest] of routes) {
  debug.info(`Mounting ${method.toUpperCase()} ${route}`);
  todosItemRouter[method](route, ...rest);
}
