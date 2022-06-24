import expressJoi from 'express-joi-validation';
import JoiImport from 'joi';

export const validator = expressJoi.createValidator({});

export const Joi = JoiImport;
