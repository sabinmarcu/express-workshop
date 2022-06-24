export const logRoute = (debug) => (req, res, next) => {
  const { method, originalUrl } = req;
  debug.info(`${method.toUpperCase()} ${originalUrl}`);
  next();
};
