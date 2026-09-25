import { Temporal } from "@js-temporal/polyfill";
import { getWeekYear } from "../getWeekYear/index.js";
import { startOfWeek } from "../startOfWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface StartOfWeekYearOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export function startOfWeekYear(date: ZonedDateTime, options?: StartOfWeekYearOptions): ZonedDateTime {
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = date.with({
    year,
    month: 1,
    day: firstWeekContainsDate,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
  });
  return startOfWeek(firstWeek, options);
}
