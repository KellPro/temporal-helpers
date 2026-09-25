import { Temporal } from "@js-temporal/polyfill";
import { differenceInCalendarDays } from "../differenceInCalendarDays/index.js";
import { startOfWeekYear } from "../startOfWeekYear/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface SetWeekYearOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export function setWeekYear(date: ZonedDateTime, weekYear: number, options?: SetWeekYearOptions): ZonedDateTime {
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? 1;
  const dayOffset = differenceInCalendarDays(date, startOfWeekYear(date, options));
  const anchor = date.with({
    year: weekYear,
    month: 1,
    day: firstWeekContainsDate,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
  });
  const weekYearStart = startOfWeekYear(anchor, options);
  return weekYearStart.add({ days: dayOffset }).with({
    hour: date.hour,
    minute: date.minute,
    second: date.second,
    millisecond: date.millisecond,
    microsecond: date.microsecond,
    nanosecond: date.nanosecond,
  });
}
