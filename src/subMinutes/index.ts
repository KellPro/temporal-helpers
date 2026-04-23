import { addMinutes } from "../addMinutes/index.js";

export function subMinutes(date: Parameters<typeof addMinutes>[0], amount: number): ReturnType<typeof addMinutes> {
  return addMinutes(date, -amount);
}
