import { Temporal } from "@js-temporal/polyfill";
import { startOfWeek } from "../startOfWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface IsSameWeekOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function isSameWeek(date: ZonedDateTime, dateToCompare: ZonedDateTime, options?: IsSameWeekOptions): boolean {
  const startOfDate = startOfWeek(date, options);
  const startOfCompare = startOfWeek(dateToCompare, options);
  return startOfDate.epochMilliseconds === startOfCompare.epochMilliseconds;
}
