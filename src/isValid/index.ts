import { Temporal } from "@js-temporal/polyfill";

export function isValid(date: Temporal.ZonedDateTime): boolean {
  return !isNaN(date.epochMilliseconds);
}
