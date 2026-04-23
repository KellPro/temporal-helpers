import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getSeconds(date: ZonedDateTime): number {
  return date.second;
}
