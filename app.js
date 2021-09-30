const express = require('express');
const logger = require('morgan');
// Implement CORS
const cors = require('cors');
const csp = require('express-csp');
const cspConfig = require('./utils/cspConfig');

const app = express();

// Implement CORS
app.use(cors());
app.options('*', cors());
csp.extend(app, cspConfig);

const listRouter = require('./routes/listRoutes');
const AppError = require('./utils/AppError');
const errorHandler = require('./utils/errorHandler');

//Middleware
app.use(logger('dev'));
app.use(express.json({ limit: '10kb' }));

//Route handling
app.use('/api/lists', listRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

//Global error handler
app.use(errorHandler);

module.exports = app;
