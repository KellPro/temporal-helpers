import { Temporal } from "@js-temporal/polyfill";
import { isSameMinute } from "../isSameMinute/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isThisMinute(date: ZonedDateTime, referenceDate?: ZonedDateTime): boolean {
  const refDate = referenceDate ?? Temporal.Now.zonedDateTimeISO(date.timeZoneId);
  return isSameMinute(date, refDate);
}
