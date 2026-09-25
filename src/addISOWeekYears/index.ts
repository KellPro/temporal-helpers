import { getISOWeekYear } from "../getISOWeekYear/index.js";
import { setISOWeekYear } from "../setISOWeekYear/index.js";

export function addISOWeekYears(date: Parameters<typeof getISOWeekYear>[0], amount: number): ReturnType<typeof setISOWeekYear> {
  return setISOWeekYear(date, getISOWeekYear(date) + amount);
}
