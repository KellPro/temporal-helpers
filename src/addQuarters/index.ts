import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function addQuarters(date: ZonedDateTime, amount: number): ZonedDateTime {
  return date.add({ months: amount * 3 });
}
