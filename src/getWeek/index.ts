import { Temporal } from "@js-temporal/polyfill";
import { differenceInCalendarDays } from "../differenceInCalendarDays/index.js";
import { startOfWeek } from "../startOfWeek/index.js";
import { startOfWeekYear } from "../startOfWeekYear/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface GetWeekOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export function getWeek(date: ZonedDateTime, options?: GetWeekOptions): number {
  const days = differenceInCalendarDays(startOfWeek(date, options), startOfWeekYear(date, options));
  return Math.round(days / 7) + 1;
}
