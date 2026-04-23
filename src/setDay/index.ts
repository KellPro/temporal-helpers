import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function setDay(date: ZonedDateTime, day: number): ZonedDateTime {
  return date.with({ day });
}
