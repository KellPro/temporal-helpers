import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getDecade(date: ZonedDateTime): number {
  return Math.floor(date.year / 10);
}
