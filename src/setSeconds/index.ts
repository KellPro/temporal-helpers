import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function setSeconds(date: ZonedDateTime, seconds: number): ZonedDateTime {
  return date.with({ second: seconds });
}
