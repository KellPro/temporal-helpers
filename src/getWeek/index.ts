import { Temporal } from "@js-temporal/polyfill";
import { startOfWeek } from "../startOfWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface GetWeekOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export function getWeek(date: ZonedDateTime, options?: GetWeekOptions): number {
  const yearStart = date.with({ month: 1, day: 1 });
  const start = startOfWeek(yearStart, options);
  const diff = date.since(start, { largestUnit: "day" });
  return Math.floor(diff.days / 7) + 1;
}
