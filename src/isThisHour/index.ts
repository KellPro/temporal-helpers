import { Temporal } from "@js-temporal/polyfill";
import { isSameHour } from "../isSameHour/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isThisHour(date: ZonedDateTime, referenceDate?: ZonedDateTime): boolean {
  const refDate = referenceDate ?? Temporal.Now.zonedDateTimeISO(date.getTimeZone().id);
  return isSameHour(date, refDate);
}
