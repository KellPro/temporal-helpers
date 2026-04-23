import { Temporal } from "@js-temporal/polyfill";
import { startOfISOWeek } from "../startOfISOWeek/index.js";
import { getISOWeekYear } from "../getISOWeekYear/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function startOfISOWeekYear(date: ZonedDateTime): ZonedDateTime {
  const isoWeekYear = getISOWeekYear(date);
  const jan4 = date.with({ year: isoWeekYear, month: 1, day: 4, hour: 0, minute: 0, second: 0, nanosecond: 0 });
  return startOfISOWeek(jan4);
}
