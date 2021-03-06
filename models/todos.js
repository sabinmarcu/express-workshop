import {
  create as createEntity,
  byId as entityById,
  list as listEntity,
  update as updateEntity,
  remove as removeEntity,
} from './entity.js';

const data = [];

/**
 * {
 *  title: string,
 *  done: boolean,
 * }
 */

export const create = (title, done = false) => createEntity(data, { title, done });

export const byId = entityById(data);
export const list = (predicate) => listEntity(data, predicate);

export const update = updateEntity(data);

export const remove = removeEntity(data);

export const byStatus = (done) => list((todo) => todo.done === done);
