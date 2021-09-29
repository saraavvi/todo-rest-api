const express = require('express');
const logger = require('morgan');

const app = express();

const listRouter = require('./routes/listRoutes');

//Middleware
app.use(logger('dev'));

app.use('/api/lists', listRouter);

//Global error handler
app.use((err, req, res, next) => {
  res.status(400).json({
    status: 'fail',
    message: err,
  });
});

module.exports = app;
