import { addYears } from "../addYears/index.js";

export function subYears(date: Parameters<typeof addYears>[0], amount: number): ReturnType<typeof addYears> {
  return addYears(date, -amount);
}
