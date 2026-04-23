import { Temporal } from "@js-temporal/polyfill";
import { startOfMonth } from "../startOfMonth/index.js";
import { endOfMonth } from "../endOfMonth/index.js";
import { eachWeekendOfInterval } from "../eachWeekendOfInterval/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function eachWeekendOfMonth(date: ZonedDateTime): ZonedDateTime[] {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return eachWeekendOfInterval({ start, end });
}
