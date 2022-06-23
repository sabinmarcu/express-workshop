import consola from 'consola';

export const makeLogger = (scope) => consola.withScope(scope);
