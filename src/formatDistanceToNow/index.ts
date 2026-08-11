import { Temporal } from "@js-temporal/polyfill";
import {
  formatDistance,
  type FormatDistanceOptions,
} from "../formatDistance/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export type FormatDistanceToNowOptions = FormatDistanceOptions;

export function formatDistanceToNow(
  date: ZonedDateTime,
  options?: FormatDistanceToNowOptions,
): string {
  const now = Temporal.Now.zonedDateTimeISO(date.timeZoneId);
  return formatDistance(date, now, options);
}
