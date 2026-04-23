import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getQuarter(date: ZonedDateTime): number {
  return Math.ceil(date.month / 3);
}
