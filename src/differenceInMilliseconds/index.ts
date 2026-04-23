import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function differenceInMilliseconds(laterDate: ZonedDateTime, earlierDate: ZonedDateTime): number {
  return laterDate.epochMilliseconds - earlierDate.epochMilliseconds;
}
