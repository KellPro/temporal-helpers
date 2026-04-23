import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function setYear(date: ZonedDateTime, year: number): ZonedDateTime {
  return date.with({ year });
}
