import { addHours } from "../addHours/index.js";

export function subHours(date: Parameters<typeof addHours>[0], amount: number): ReturnType<typeof addHours> {
  return addHours(date, -amount);
}
