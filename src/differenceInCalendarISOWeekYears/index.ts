import { Temporal } from "@js-temporal/polyfill";
import { getISOWeekYear } from "../getISOWeekYear/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function differenceInCalendarISOWeekYears(laterDate: ZonedDateTime, earlierDate: ZonedDateTime): number {
  return getISOWeekYear(laterDate) - getISOWeekYear(earlierDate);
}
