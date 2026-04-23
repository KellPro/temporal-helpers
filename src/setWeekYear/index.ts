import { Temporal } from "@js-temporal/polyfill";
import { getWeekYear } from "../getWeekYear/index.js";
import { startOfWeekYear } from "../startOfWeekYear/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface SetWeekYearOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function setWeekYear(date: ZonedDateTime, year: number, options?: SetWeekYearOptions): ZonedDateTime {
  const currentWeekYear = getWeekYear(date, options);
  const currentStart = startOfWeekYear(date, options);
  const diff = year - currentWeekYear;
  return currentStart.add({ years: diff });
}
