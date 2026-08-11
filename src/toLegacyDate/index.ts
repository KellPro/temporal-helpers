import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

/** Converts a ZonedDateTime to a legacy Date at the same instant. Time zone is discarded. */
export function toLegacyDate(date: ZonedDateTime): Date {
  return new Date(date.epochMilliseconds);
}
