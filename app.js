const express = require('express');
const logger = require('morgan');
// Security resources
const xss = require('xss-clean');
const hpp = require('hpp');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
// CORS resources
const cors = require('cors');
const csp = require('express-csp');
const cspConfig = require('./utils/cspConfig');

const app = express();
const AppError = require('./utils/AppError');
const errorHandler = require('./utils/errorHandler');
const listRouter = require('./routes/listRoutes');
const userRouter = require('./routes/userRoutes');

// Implement Security features
// Set security HTTP headers
app.use(helmet());
// Limit request rates
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour.',
});
app.use('*', limiter);
// Data sanitazion against NoSQL data injection
app.use(mongoSanitize());
// Data sanitazion against XSS
app.use(xss());
// Prevent param pollution
app.use(hpp());

// Implement CORS
app.use(cors());
app.options('*', cors());
csp.extend(app, cspConfig);

//Middleware
app.use(logger('dev'));
app.use(express.json({ limit: '10kb' }));

//Route handling
app.use('/api/lists', listRouter);
app.use('/api/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

//Global error handler
app.use(errorHandler);

module.exports = app;
