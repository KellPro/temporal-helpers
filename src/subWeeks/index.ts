import { addWeeks } from "../addWeeks/index.js";

export function subWeeks(date: Parameters<typeof addWeeks>[0], amount: number): ReturnType<typeof addWeeks> {
  return addWeeks(date, -amount);
}
