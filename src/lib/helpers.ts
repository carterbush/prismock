import { Item } from './delegate';

export function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function shallowCompare(a: Item, b: Item) {
  for (const key in b) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}

export function pick(obj: Record<string, unknown>, keys: string[]) {
  return Object.entries(obj).reduce((accumulator, [currentKey, currentValue]) => {
    if (keys.includes(currentKey)) {
      accumulator = { ...accumulator, [currentKey]: currentValue };
    }
    return accumulator;
  }, {});
}

export function omit(obj: Record<string, unknown>, keys: string[]) {
  return Object.entries(obj).reduce((accumulator, [currentKey, currentValue]) => {
    if (!keys.includes(currentKey)) {
      accumulator = { ...accumulator, [currentKey]: currentValue };
    }
    return accumulator;
  }, {});
}

export function uuid() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export function removeUndefined(o?: Record<string, unknown>) {
  if (!o) return o;

  return Object.keys(o).reduce((accumulator, currentValue) => {
    if (typeof o[currentValue] !== 'undefined') {
      return {
        ...accumulator,
        [currentValue]: o[currentValue],
      };
    }
    return accumulator;
  }, {} as Item);
}

export function pipe<T>(...functions: Array<(arg: T) => T>) {
  return (value: T) => {
    return functions.reduce((currentValue, currentFunction) => {
      return currentFunction(currentValue);
    }, value);
  };
}

export function compose<T>(...functions: Array<(arg: T) => T>) {
  return (value: T) => {
    return functions.reduceRight((currentValue, currentFunction) => {
      return currentFunction(currentValue);
    }, value);
  };
}

export function unique<T>(value: T[]) {
  return Array.from(new Set(value));
}

export function ensureArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
