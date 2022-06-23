export const logRoute = (debug) => (req, res, next) => {
  const { method, originalUrl } = req;
  debug.debug(`${method.toUpperCase()} ${originalUrl}`);
  next();
};
