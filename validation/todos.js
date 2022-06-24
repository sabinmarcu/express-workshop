import Joi from 'joi';

export const getSchema = Joi.object({
  done: Joi.string().pattern(/^(true|false)$/),
});
export const titleSchema = Joi.string().min(8);
export const createSchema = Joi.object({
  title: titleSchema.required(),
});
export const updateSchema = Joi.object({
  title: titleSchema,
  done: Joi.boolean(),
});
