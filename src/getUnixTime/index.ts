import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getUnixTime(date: ZonedDateTime): number {
  return Math.floor(date.epochMilliseconds / 1000);
}
