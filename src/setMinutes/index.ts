import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function setMinutes(date: ZonedDateTime, minutes: number): ZonedDateTime {
  return date.with({ minute: minutes });
}
