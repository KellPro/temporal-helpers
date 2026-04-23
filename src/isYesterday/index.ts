import { Temporal } from "@js-temporal/polyfill";
import { subDays } from "../subDays/index.js";
import { isSameDay } from "../isSameDay/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isYesterday(date: ZonedDateTime, referenceDate: ZonedDateTime = Temporal.Now.zonedDateTimeISO()): boolean {
  const yesterday = subDays(referenceDate, 1);
  return isSameDay(date, yesterday);
}
