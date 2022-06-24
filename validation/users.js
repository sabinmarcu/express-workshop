import Joi from 'joi';

export const getSchema = Joi.object({
  role: Joi.string().pattern(/^(admin|manager|user)$/),
});

export const createUpdateSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string(),
  name: Joi.string(),
});
