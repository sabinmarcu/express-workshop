export const flag = (req, key, value) => {
  req.flags = req.flags || {};
  req.flags[key] = value;
};

export const hasFlag = (req, key, predicate = undefined) => {
  req.flags = req.flags || {};
  const value = req.flags[key];
  if (predicate) {
    return predicate(value);
  }
  return value;
};
