import { addMilliseconds } from "../addMilliseconds/index.js";

export function subMilliseconds(date: Parameters<typeof addMilliseconds>[0], amount: number): ReturnType<typeof addMilliseconds> {
  return addMilliseconds(date, -amount);
}
