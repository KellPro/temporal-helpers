import { Temporal } from "@js-temporal/polyfill";
import { startOfWeek } from "../startOfWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface StartOfWeekYearOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function startOfWeekYear(date: ZonedDateTime, options?: StartOfWeekYearOptions): ZonedDateTime {
  const year = date.year;
  const jan1 = date.with({ year, month: 1, day: 1, hour: 0, minute: 0, second: 0, nanosecond: 0 });
  return startOfWeek(jan1, options);
}
