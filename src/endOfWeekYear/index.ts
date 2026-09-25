import { Temporal } from "@js-temporal/polyfill";
import { getWeekYear } from "../getWeekYear/index.js";
import { startOfWeekYear } from "../startOfWeekYear/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface EndOfWeekYearOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export function endOfWeekYear(date: ZonedDateTime, options?: EndOfWeekYearOptions): ZonedDateTime {
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? 1;
  const weekYear = getWeekYear(date, options);
  const nextYearAnchor = date.with({
    year: weekYear + 1,
    month: 1,
    day: firstWeekContainsDate,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
  });
  return startOfWeekYear(nextYearAnchor, options).subtract({ nanoseconds: 1 });
}
