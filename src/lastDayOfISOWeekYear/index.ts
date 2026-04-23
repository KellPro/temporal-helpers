import { Temporal } from "@js-temporal/polyfill";
import { endOfISOWeekYear } from "../endOfISOWeekYear/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function lastDayOfISOWeekYear(date: ZonedDateTime): ZonedDateTime {
  return endOfISOWeekYear(date);
}
