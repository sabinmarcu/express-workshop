import { authRouter } from './auth.js';
import { todosRouter } from './todos.js';
import { usersRouter } from './users.js';

export default [
  ['3000', authRouter],
  ['4000', todosRouter],
  ['5000', usersRouter],
];
