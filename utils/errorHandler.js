module.exports = (err, req, res, next) => {
  const { statusCode = 500 } = err;
  const { message = 'Oh no, something went wrong!' } = err;
  res.status(statusCode).json({
    status: err.status,
    message,
    statusCode,
  });
};
