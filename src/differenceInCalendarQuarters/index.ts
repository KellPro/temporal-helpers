import { Temporal } from "@js-temporal/polyfill";
import { getQuarter } from "../getQuarter/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function differenceInCalendarQuarters(laterDate: ZonedDateTime, earlierDate: ZonedDateTime): number {
  const yearsDiff = laterDate.year - earlierDate.year;
  const quartersDiff = getQuarter(laterDate) - getQuarter(earlierDate);
  return yearsDiff * 4 + quartersDiff;
}
