const Joi = require('joi');
const j2s = require('joi-to-swagger');

const register = Joi.object({
    name: Joi.string().trim().required().messages({
      'string.empty': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Valid email required'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters'
    })
})

const login = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Valid email required'
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password is required'
    })
})

const { swagger: UserRegisterSwagger } = j2s(register);
const { swagger: UserLoginSwagger } = j2s(login);

module.exports = { register, login, UserRegisterSwagger, UserLoginSwagger };
