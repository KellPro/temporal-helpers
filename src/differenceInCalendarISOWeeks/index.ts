import { Temporal } from "@js-temporal/polyfill";
import { startOfISOWeek } from "../startOfISOWeek/index.js";
import { differenceInCalendarDays } from "../differenceInCalendarDays/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function differenceInCalendarISOWeeks(laterDate: ZonedDateTime, earlierDate: ZonedDateTime): number {
  const diff = differenceInCalendarDays(startOfISOWeek(laterDate), startOfISOWeek(earlierDate)) / 7;
  return Math.round(diff);
}
