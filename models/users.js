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
 * email: string,
 * password: string,
 * name: string,
 * role: string,
 * }
 */

export const create = createEntity(data);

export const byId = entityById(data);
export const list = (predicate) => listEntity(data, predicate);

export const update = updateEntity(data);

export const remove = removeEntity(data);

export const byRole = (role) => list((todo) => todo.role === role);
export const forbiddenFields = ['password'];
