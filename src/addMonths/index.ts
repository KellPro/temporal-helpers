import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function addMonths(date: ZonedDateTime, amount: number): ZonedDateTime {
  return date.add({ months: amount });
}
