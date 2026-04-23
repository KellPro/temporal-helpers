import { Temporal } from "@js-temporal/polyfill";
import { startOfYear } from "../startOfYear/index.js";
import { endOfYear } from "../endOfYear/index.js";
import { eachWeekendOfInterval } from "../eachWeekendOfInterval/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function eachWeekendOfYear(date: ZonedDateTime): ZonedDateTime[] {
  const start = startOfYear(date);
  const end = endOfYear(date);
  return eachWeekendOfInterval({ start, end });
}
