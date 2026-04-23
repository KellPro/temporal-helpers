import { Temporal } from "@js-temporal/polyfill";
import { getDayOfYear } from "../getDayOfYear/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function setDayOfYear(date: ZonedDateTime, day: number): ZonedDateTime {
  const currentDay = getDayOfYear(date);
  const diff = day - currentDay;
  return date.add({ days: diff });
}
