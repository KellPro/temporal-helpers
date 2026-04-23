import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function addDays(date: ZonedDateTime, amount: number): ZonedDateTime {
  return date.add({ days: amount });
}
