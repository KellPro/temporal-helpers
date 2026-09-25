import { Temporal } from "@js-temporal/polyfill";
import { startOfWeek } from "../startOfWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface GetWeekYearOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

function weekYearAnchor(date: ZonedDateTime, year: number, firstWeekContainsDate: number): ZonedDateTime {
  return date.with({
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
}

export function getWeekYear(date: ZonedDateTime, options?: GetWeekYearOptions): number {
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? 1;
  const year = date.year;
  const startOfNextYear = startOfWeek(weekYearAnchor(date, year + 1, firstWeekContainsDate), options);

  if (Temporal.ZonedDateTime.compare(date, startOfNextYear) >= 0) {
    return year + 1;
  }

  const startOfThisYear = startOfWeek(weekYearAnchor(date, year, firstWeekContainsDate), options);
  if (Temporal.ZonedDateTime.compare(date, startOfThisYear) >= 0) {
    return year;
  }

  return year - 1;
}
