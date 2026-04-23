import { addMonths } from "../addMonths/index.js";

export function subMonths(date: Parameters<typeof addMonths>[0], amount: number): ReturnType<typeof addMonths> {
  return addMonths(date, -amount);
}
