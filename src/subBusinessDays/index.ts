import { addBusinessDays } from "../addBusinessDays/index.js";

export function subBusinessDays(date: Parameters<typeof addBusinessDays>[0], amount: number): ReturnType<typeof addBusinessDays> {
  return addBusinessDays(date, -amount);
}
