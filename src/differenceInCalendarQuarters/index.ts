import { Temporal } from "@js-temporal/polyfill";
import { differenceInCalendarMonths } from "../differenceInCalendarMonths/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function differenceInCalendarQuarters(laterDate: ZonedDateTime, earlierDate: ZonedDateTime): number {
  return Math.floor(differenceInCalendarMonths(laterDate, earlierDate) / 3);
}
