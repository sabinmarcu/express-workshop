import { authRouter } from './auth.js';
import { todosRouter } from './todos.js';

export default [
  ['/auth', authRouter],
  ['/todos', todosRouter],
];
