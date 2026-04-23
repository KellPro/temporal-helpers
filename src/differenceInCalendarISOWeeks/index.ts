import { Temporal } from "@js-temporal/polyfill";
import { startOfISOWeek } from "../startOfISOWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function differenceInCalendarISOWeeks(laterDate: ZonedDateTime, earlierDate: ZonedDateTime): number {
  const startOfLater = startOfISOWeek(laterDate);
  const startOfEarlier = startOfISOWeek(earlierDate);
  return Math.round((startOfLater.epochMilliseconds - startOfEarlier.epochMilliseconds) / (7 * 86400000));
}
