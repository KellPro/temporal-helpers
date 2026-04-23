import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function addHours(date: ZonedDateTime, amount: number): ZonedDateTime {
  return date.add({ hours: amount });
}
