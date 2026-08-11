import { Temporal } from "@js-temporal/polyfill";
import { differenceInCalendarDays } from "../differenceInCalendarDays/index.js";
import { format } from "../format/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface FormatRelativeOptions {
  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const weekdayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function formatTime12h(date: ZonedDateTime): string {
  const hour12 = date.hour % 12 || 12;
  const minute = String(date.minute).padStart(2, "0");
  const period = date.hour >= 12 ? "PM" : "AM";
  return `${hour12}:${minute} ${period}`;
}

function weekdayName(date: ZonedDateTime): string {
  return weekdayNames[date.dayOfWeek - 1];
}

export function formatRelative(
  date: ZonedDateTime,
  baseDate: ZonedDateTime,
  options?: FormatRelativeOptions,
): string {
  const locale = options?.locale ?? "en-US";
  if (locale !== "en-US") {
    throw new RangeError(
      `locale "${locale}" is not supported; only "en-US" is available`,
    );
  }

  const zone = baseDate.timeZoneId;
  const dateInBaseZone = date.withTimeZone(zone);
  const baseInBaseZone = baseDate.withTimeZone(zone);

  const diff = differenceInCalendarDays(dateInBaseZone, baseInBaseZone);

  if (diff < -6 || diff >= 7) {
    return format(dateInBaseZone, "MM/dd/yyyy");
  }

  const time = formatTime12h(dateInBaseZone);

  if (diff < -1) {
    return `last ${weekdayName(dateInBaseZone)} at ${time}`;
  }
  if (diff < 0) {
    return `yesterday at ${time}`;
  }
  if (diff < 1) {
    return `today at ${time}`;
  }
  if (diff < 2) {
    return `tomorrow at ${time}`;
  }
  return `${weekdayName(dateInBaseZone)} at ${time}`;
}
