import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function setMonth(date: ZonedDateTime, month: number): ZonedDateTime {
  return date.with({ month });
}
