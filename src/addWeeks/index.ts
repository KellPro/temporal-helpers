import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function addWeeks(date: ZonedDateTime, amount: number): ZonedDateTime {
  return date.add({ weeks: amount });
}
