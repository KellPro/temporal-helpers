import { Temporal } from "@js-temporal/polyfill";

export function isDate(value: unknown): value is Temporal.ZonedDateTime {
  return value instanceof Temporal.ZonedDateTime;
}
