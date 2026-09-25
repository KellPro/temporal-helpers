import { Temporal } from "@js-temporal/polyfill";
import { getISOWeekYear } from "../getISOWeekYear/index.js";
import { endOfISOWeek } from "../endOfISOWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function endOfISOWeekYear(date: ZonedDateTime): ZonedDateTime {
  const isoYear = getISOWeekYear(date);
  const dec28 = date.with({ year: isoYear + 1, month: 1, day: 4, hour: 23, minute: 59, second: 59, millisecond: 999, microsecond: 999, nanosecond: 999 });
  return endOfISOWeek(dec28);
}
