import { Temporal } from "@js-temporal/polyfill";
import { startOfWeek } from "../startOfWeek/index.js";
import { startOfMonth } from "../startOfMonth/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface GetWeekOfMonthOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function getWeekOfMonth(date: ZonedDateTime, options?: GetWeekOfMonthOptions): number {
  const startOfMonthDate = startOfMonth(date);
  const startOfWeekMonth = startOfWeek(startOfMonthDate, options);
  const startOfWeekDate = startOfWeek(date, options);
  
  const diff = startOfWeekDate.since(startOfWeekMonth);
  return Math.floor(diff.days / 7) + 1;
}
