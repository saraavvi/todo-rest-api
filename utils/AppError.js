class AppError extends Error {
  constructor(message, statusCode) {
    // Message is only one Error accepts so we can use super
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    //So we only send info back to user on handled errors
    this.isOperational = true;
    //Save stack trace of error
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
