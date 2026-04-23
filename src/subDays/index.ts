import { addDays } from "../addDays/index.js";

export function subDays(date: Parameters<typeof addDays>[0], amount: number): ReturnType<typeof addDays> {
  return addDays(date, -amount);
}
