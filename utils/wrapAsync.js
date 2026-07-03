/**
 * Wraps an async route handler so any rejected promise is forwarded
 * to Express's next(err) error handler instead of causing an
 * UnhandledPromiseRejectionWarning.
 */
module.exports = function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};
