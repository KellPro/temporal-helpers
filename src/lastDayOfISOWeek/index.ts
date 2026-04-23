import { Temporal } from "@js-temporal/polyfill";
import { startOfISOWeek } from "../startOfISOWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function lastDayOfISOWeek(date: ZonedDateTime): ZonedDateTime {
  return startOfISOWeek(date).add({ days: 6, hours: 23, minutes: 59, seconds: 59, nanoseconds: 999999999 });
}
