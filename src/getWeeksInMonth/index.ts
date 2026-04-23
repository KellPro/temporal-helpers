import { Temporal } from "@js-temporal/polyfill";
import { startOfMonth } from "../startOfMonth/index.js";
import { endOfMonth } from "../endOfMonth/index.js";
import { startOfWeek } from "../startOfWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface GetWeeksInMonthOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function getWeeksInMonth(date: ZonedDateTime, options?: GetWeeksInMonthOptions): number {
  const start = startOfWeek(startOfMonth(date), options);
  const end = startOfWeek(endOfMonth(date), options);
  const diff = end.since(start);
  return Math.floor(diff.days / 7) + 1;
}
