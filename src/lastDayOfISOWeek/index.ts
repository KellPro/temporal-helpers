import { Temporal } from "@js-temporal/polyfill";
import { endOfISOWeek } from "../endOfISOWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function lastDayOfISOWeek(date: ZonedDateTime): ZonedDateTime {
  return endOfISOWeek(date);
}
