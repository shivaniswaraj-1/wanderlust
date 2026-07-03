/**
 * Custom error class that carries an HTTP status code alongside
 * the standard Error message so the global error handler can
 * respond with the correct status.
 */
class ExpressError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ExpressError;
