import { nanoid } from 'nanoid';

const data = [];

export const create = (title, done = false) => {
  const newTodo = ({
    title,
    done,
    id: nanoid(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  data.push(newTodo);
  return newTodo;
};

export const byId = (id) => data.find((todo) => todo.id === id);
export const byStatus = (done) => data.filter((todo) => todo.done === done);
export const list = () => data;

export const update = (
  id,
  input, // { message, done }
) => {
  const todo = byId(id);
  const todoIdx = data.indexOf(todo);
  const newTodo = {
    ...todo,
    ...input,
    updatedAt: Date.now(),
  };
  data.splice(todoIdx, 1, newTodo);
  return newTodo;
};

export const remove = (id) => {
  const todo = byId(id);
  const todoIdx = data.indexOf(todo);
  data.splice(todoIdx, 1);
  return todo;
};
