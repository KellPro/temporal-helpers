import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function addMilliseconds(date: ZonedDateTime, amount: number): ZonedDateTime {
  return date.add({ milliseconds: amount });
}
