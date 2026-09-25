import { normalizeZero } from "../normalizeZero/index.js";

type RoundingFunction = (value: number) => number;

export function getRoundingMethod(
  roundingMethod?: "ceil" | "floor" | "round" | "trunc",
): RoundingFunction {
  const round = roundingMethod ? Math[roundingMethod] : Math.trunc;
  // Prevent negative zero (date-fns issue #2555)
  return (value: number) => normalizeZero(round(value));
}
