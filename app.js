const express = require('express');
const logger = require('morgan');

const app = express();

const listRouter = require('./routes/listRoutes');
const AppError = require('./utils/AppError');
const errorHandler = require('./utils/errorHandler');

//Middleware
app.use(logger('dev'));

//Route handling
app.use('/api/lists', listRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

//Global error handler
app.use(errorHandler);

module.exports = app;
