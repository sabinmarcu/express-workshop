import { authRouter } from './auth.js';
import { todosRouter } from './todos.js';
import { usersRouter } from './users.js';

export default [
  ['/auth', authRouter],
  ['/todos', todosRouter],
  ['/users', usersRouter],
];
