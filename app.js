const express = require('express');
const logger = require('morgan');

const app = express();

const listRouter = require('./routes/listRoutes');

//Middleware
app.use(logger('dev'));

app.use('/api/lists', listRouter);

module.exports = app;
