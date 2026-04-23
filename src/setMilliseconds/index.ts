import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function setMilliseconds(date: ZonedDateTime, milliseconds: number): ZonedDateTime {
  return date.with({ millisecond: milliseconds });
}
