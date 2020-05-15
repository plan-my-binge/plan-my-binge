export const isEmpty = arg => (
  arg == null ||
  arg.length === 0 ||
  (typeof arg === 'object' && Object.keys(arg).length === 0)
);