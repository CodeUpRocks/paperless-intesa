export const isEmpty = (value?: string): boolean =>
  value === undefined || value === null || value === '';

export const isNotEmpty = (value?: string): boolean => !isEmpty(value);
