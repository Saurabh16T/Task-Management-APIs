const swaggerJsdoc = require('swagger-jsdoc');
const tasks = require('../validators/task');
const users = require('../validators/user');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJS Tasks API',
      version: '1.0.0',
      description: 'API documentation for Posts service',
    },
    components: {
      schemas: {
        CreateTask: tasks.createTaskSwagger,
        UpdateTask: tasks.updateTaskSwagger,
        RegisterUser: users.UserRegisterSwagger,
        LoginUser: users.UserLoginSwagger
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT authorization header using the Bearer scheme."
        }
      },
    },
  },
  apis: ['**/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
