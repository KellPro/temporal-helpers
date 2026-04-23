import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function addYears(date: ZonedDateTime, amount: number): ZonedDateTime {
  return date.add({ years: amount });
}
