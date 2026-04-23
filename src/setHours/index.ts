import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function setHours(date: ZonedDateTime, hours: number): ZonedDateTime {
  return date.with({ hour: hours });
}
