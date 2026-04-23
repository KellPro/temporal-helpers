import { Temporal } from "@js-temporal/polyfill";
import { getWeek } from "../getWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface SetWeekOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function setWeek(date: ZonedDateTime, week: number, options?: SetWeekOptions): ZonedDateTime {
  const currentWeek = getWeek(date, options);
  const diff = week - currentWeek;
  return date.add({ weeks: diff });
}
