import { Temporal } from "@js-temporal/polyfill";
import { isSameYear } from "../isSameYear/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isThisYear(date: ZonedDateTime, referenceDate: ZonedDateTime = Temporal.Now.zonedDateTimeISO()): boolean {
  return isSameYear(date, referenceDate);
}
