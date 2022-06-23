import { byId } from '../models/todos.js';

export const extractTodo = (req, res, next) => {
  const { id } = req.params;
  const todo = byId(id);
  if (!todo) {
    return res.status(404).send('Not Found!');
  }
  req.todo = todo;
  return next();
};
