export const extractEntity = (varName, byId) => (req, res, next) => {
  const { id } = req.params;
  const entity = byId(id);
  if (!entity) {
    return res.status(404).send('Not Found!');
  }
  req[varName] = entity;
  return next();
};
