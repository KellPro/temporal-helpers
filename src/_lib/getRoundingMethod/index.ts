type RoundingFunction = (value: number) => number;

export function getRoundingMethod(
  roundingMethod?: "ceil" | "floor" | "round" | "trunc",
): RoundingFunction {
  if (roundingMethod === "ceil") {
    return Math.ceil;
  }
  if (roundingMethod === "floor") {
    return Math.floor;
  }
  if (roundingMethod === "round") {
    return Math.round;
  }
  return Math.trunc;
}
