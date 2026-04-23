import { Temporal } from "@js-temporal/polyfill";
import { isSameQuarter } from "../isSameQuarter/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isThisQuarter(date: ZonedDateTime, referenceDate: ZonedDateTime = Temporal.Now.zonedDateTimeISO()): boolean {
  return isSameQuarter(date, referenceDate);
}
