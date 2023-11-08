export interface Range {
  min: number;
  max: number;
}

export const isInRange = (value: number, range: Range): boolean => {
  return value >= range.min && value <= range.max;
};
