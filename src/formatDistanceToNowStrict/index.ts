import { Temporal } from "@js-temporal/polyfill";
import {
  formatDistanceStrict,
  type FormatDistanceStrictOptions,
} from "../formatDistanceStrict/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export type FormatDistanceToNowStrictOptions = FormatDistanceStrictOptions;

export function formatDistanceToNowStrict(
  date: ZonedDateTime,
  options?: FormatDistanceToNowStrictOptions,
): string {
  const now = Temporal.Now.zonedDateTimeISO(date.timeZoneId);
  return formatDistanceStrict(date, now, options);
}
