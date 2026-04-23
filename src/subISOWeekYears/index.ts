import { addISOWeekYears } from "../addISOWeekYears/index.js";

export function subISOWeekYears(date: Parameters<typeof addISOWeekYears>[0], amount: number): ReturnType<typeof addISOWeekYears> {
  return addISOWeekYears(date, -amount);
}
