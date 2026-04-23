import { Temporal } from "@js-temporal/polyfill";
import { startOfWeekYear } from "../startOfWeekYear/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface GetWeekYearOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export function getWeekYear(date: ZonedDateTime, options?: GetWeekYearOptions): number {
  return startOfWeekYear(date, options).year;
}
