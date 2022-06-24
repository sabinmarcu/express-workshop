export const curry = (fn) => {
  const curried = function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...nextArgs) => curried.apply(this, [...args, ...nextArgs]);
  };
  return curried;
};
