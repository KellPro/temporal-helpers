/**
 * Replaces -0 with +0. IEEE 754 numbers have two zeros; -0 leaks out of
 * `sign * 0` products and rounding of negative fractions, and breaks
 * `Object.is` checks and `1/x` arithmetic downstream.
 */
export function normalizeZero(value: number): number {
  return value === 0 ? 0 : value;
}
