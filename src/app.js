const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const routes = require('./routes');
const {statusCodes, sendResponse} = require('./utils/response')

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', routes);

// 404 handler
app.use((req, res, next) => {
  sendResponse(req,res,"Route not found",{},statusCodes.PAGE_NOT_FOUND)
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  sendResponse(req,res,err.message||"Internal server err", {}, err.status || statusCodes.INTERNAL_SERVER_ERROR)
});

module.exports = app;
