import { Temporal } from "@js-temporal/polyfill";
import { endOfWeek } from "../endOfWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface EndOfWeekYearOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function endOfWeekYear(date: ZonedDateTime, options?: EndOfWeekYearOptions): ZonedDateTime {
  const year = date.year;
  const dec31 = date.with({ year, month: 12, day: 31, hour: 23, minute: 59, second: 59, nanosecond: 999999999 });
  return endOfWeek(dec31, options);
}
