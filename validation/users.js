import Joi from 'joi';

export const getSchema = Joi.object({
  role: Joi.string().pattern(/^(admin|manager|user)$/),
});

const credentialSchemaRaw = {
  email: Joi.string().email(),
  password: Joi.string(),
};
export const credentialSchema = Joi.object(credentialSchemaRaw);

export const loginSchemaRaw = {};
for (const [key, value] of Object.entries(credentialSchemaRaw)) {
  loginSchemaRaw[key] = value.required();
}
export const loginSchema = Joi.object(loginSchemaRaw);

export const updateSchemaRaw = {
  ...credentialSchemaRaw,
  name: Joi.string(),
};
export const updateSchema = Joi.object(updateSchemaRaw);

const createSchemaRaw = {};
for (const [key, value] of Object.entries(updateSchemaRaw)) {
  createSchemaRaw[key] = value.required();
}
export const createSchema = Joi.object(createSchemaRaw);
