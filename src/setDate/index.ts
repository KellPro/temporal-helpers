import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function setDate(date: ZonedDateTime, day: number): ZonedDateTime {
  return date.with({ day });
}
