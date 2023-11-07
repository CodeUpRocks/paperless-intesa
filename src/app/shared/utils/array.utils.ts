export const isNotEmpty = <T>(list?: T[]): boolean =>
  Array.isArray(list) && list.length > 0;

export const isEmpty = <T>(list?: T[]): boolean => !isNotEmpty(list);

export const first = <T>(list: T[]): T => list[0];

export const last = <T>(list: T[]): T => list[list.length - 1];
