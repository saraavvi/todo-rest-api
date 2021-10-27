const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// CORS resources
const cors = require('cors');

const app = express();
const AppError = require('./utils/AppError');
const errorHandler = require('./utils/errorHandler');
const listRouter = require('./routes/listRoutes');
const userRouter = require('./routes/userRoutes');

// Implement Cross-Origin Resource Sharing
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://mern-sara-todo.netlify.app",
    ],
  })
);

//Middleware
app.use(logger('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

//Route handling
app.use('/api/lists', listRouter);
app.use('/api/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

//Global error handler
app.use(errorHandler);

module.exports = app;
