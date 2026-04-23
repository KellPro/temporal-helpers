import { addQuarters } from "../addQuarters/index.js";

export function subQuarters(date: Parameters<typeof addQuarters>[0], amount: number): ReturnType<typeof addQuarters> {
  return addQuarters(date, -amount);
}
