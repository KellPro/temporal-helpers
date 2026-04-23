import { Temporal } from "@js-temporal/polyfill";
import { isSameSecond } from "../isSameSecond/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isThisSecond(date: ZonedDateTime, referenceDate?: ZonedDateTime): boolean {
  const refDate = referenceDate ?? Temporal.Now.zonedDateTimeISO(date.getTimeZone().id);
  return isSameSecond(date, refDate);
}
