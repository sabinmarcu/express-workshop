export const ops = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('cant add other than numbers (wat)');
  }
  return {
    sum: a + b,
    diff: a - b,
    prod: a * b,
    quot: a / b,
    exp: a ** b,
  };
};
