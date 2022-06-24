import { nanoid } from 'nanoid';
import {
  curry,
} from '../utils/curry.js';

export const create = curry(
  (data, input) => {
    const newEntity = ({
      id: nanoid(),
      ...input,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    data.push(newEntity);
    return newEntity;
  },
);

export const byId = curry((data, id) => data.find((entity) => entity.id === id));
export const list = curry((data, predicate = undefined) => (
  predicate
    ? data.filter(predicate)
    : data
));

export const update = curry(
  (
    data,
    id,
    input, // { message, done }
  ) => {
    const entity = byId(data, id);
    const entityIdx = data.indexOf(entity);
    const newEntity = {
      ...entity,
      ...input,
      updatedAt: Date.now(),
    };
    data.splice(entityIdx, 1, newEntity);
    return newEntity;
  },
);

export const remove = curry(
  (data, id) => {
    const entity = byId(id);
    const entityIdx = data.indexOf(entity);
    data.splice(entityIdx, 1);
    return entity;
  },
);
