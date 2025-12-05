const Joi = require('joi');
const j2s = require('joi-to-swagger');
const constants = require('../utils/constants');

// Validation schemas for different operations
const createTask = Joi.object({
  title: Joi.string().trim().required().messages({'string.empty':'Title is required'}),
  description: Joi.string().allow('', null),
  priority: Joi.string().valid(...Object.values(constants.TASK_PRIORITY)),
  status: Joi.string().valid(...Object.values(constants.TASK_STATUS)),
})

const updateTask = Joi.object({
  title: Joi.string().trim().optional(),
  description: Joi.string().allow('', null).optional(),
  priority: Joi.string().valid(...Object.values(constants.TASK_PRIORITY)).optional(),
  status: Joi.string().valid(...Object.values(constants.TASK_STATUS)).optional(),
}).min(1)

const getTask = Joi.object({
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
    status: Joi.string().valid(...Object.values(constants.TASK_PRIORITY)).optional(),
    priority: Joi.string().valid(...Object.values(constants.TASK_STATUS)).optional(),
    sort: Joi.number().optional(),
})

const { swagger: createTaskSwagger } = j2s(createTask);
const { swagger: updateTaskSwagger } = j2s(updateTask);

module.exports = { 
  createTask, updateTask, getTask,
  createTaskSwagger, updateTaskSwagger
};
