const AppError = require('./AppError');

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDevelopment = (err, req, res) => {
  const { statusCode = 500 } = err;
  const { message = 'Oh no, something went wrong!' } = err;
  res.status(statusCode).json({
    status: err.status,
    message,
    statusCode,
    stack: err.stack,
  });
};

const sendErrorProduction = (err, req, res) => {
  const { statusCode = 500 } = err;
  const { message = 'Oh no, something went wrong!' } = err;
  res.status(statusCode).json({
    status: err.status,
    message,
    statusCode,
  });
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDevelopment(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    sendErrorProduction(error, req, res);
  }
};
