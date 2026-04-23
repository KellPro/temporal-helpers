import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function addMinutes(date: ZonedDateTime, amount: number): ZonedDateTime {
  return date.add({ minutes: amount });
}
