import { Temporal } from "@js-temporal/polyfill";
import { addDays } from "../addDays/index.js";
import { isSameDay } from "../isSameDay/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isTomorrow(date: ZonedDateTime, referenceDate: ZonedDateTime = Temporal.Now.zonedDateTimeISO()): boolean {
  const tomorrow = addDays(referenceDate, 1);
  return isSameDay(date, tomorrow);
}
