import { Temporal } from "@js-temporal/polyfill";
import { differenceInCalendarDays } from "../differenceInCalendarDays/index.js";
import { differenceInCalendarMonths } from "../differenceInCalendarMonths/index.js";
import { differenceInCalendarQuarters } from "../differenceInCalendarQuarters/index.js";
import { differenceInCalendarWeeks } from "../differenceInCalendarWeeks/index.js";
import { differenceInCalendarYears } from "../differenceInCalendarYears/index.js";
import { differenceInHours } from "../differenceInHours/index.js";
import { differenceInMinutes } from "../differenceInMinutes/index.js";
import { differenceInSeconds } from "../differenceInSeconds/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

const secondsInMinute = 60;
const secondsInHour = 3600;
const secondsInDay = secondsInHour * 24;
const secondsInWeek = secondsInDay * 7;
const secondsInYear = secondsInDay * 365.2425;
const secondsInMonth = secondsInYear / 12;
const secondsInQuarter = secondsInMonth * 3;

export type IntlFormatDistanceUnit =
  | "year"
  | "quarter"
  | "month"
  | "week"
  | "day"
  | "hour"
  | "minute"
  | "second";

export interface IntlFormatDistanceOptions
  extends Intl.RelativeTimeFormatOptions {
  unit?: IntlFormatDistanceUnit;
  locale?: string | string[];
}

export function intlFormatDistance(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: IntlFormatDistanceOptions,
): string {
  const zone = laterDate.timeZoneId;
  const later = laterDate.withTimeZone(zone);
  const earlier = earlierDate.withTimeZone(zone);

  let value = 0;
  let unit: Intl.RelativeTimeFormatUnit;

  if (!options?.unit) {
    const diffInSeconds = differenceInSeconds(later, earlier);

    if (Math.abs(diffInSeconds) < secondsInMinute) {
      value = differenceInSeconds(later, earlier);
      unit = "second";
    } else if (Math.abs(diffInSeconds) < secondsInHour) {
      value = differenceInMinutes(later, earlier);
      unit = "minute";
    } else if (
      Math.abs(diffInSeconds) < secondsInDay &&
      Math.abs(differenceInCalendarDays(later, earlier)) < 1
    ) {
      value = differenceInHours(later, earlier);
      unit = "hour";
    } else if (
      Math.abs(diffInSeconds) < secondsInWeek &&
      (value = differenceInCalendarDays(later, earlier)) &&
      Math.abs(value) < 7
    ) {
      unit = "day";
    } else if (Math.abs(diffInSeconds) < secondsInMonth) {
      value = differenceInCalendarWeeks(later, earlier);
      unit = "week";
    } else if (Math.abs(diffInSeconds) < secondsInQuarter) {
      value = differenceInCalendarMonths(later, earlier);
      unit = "month";
    } else if (Math.abs(diffInSeconds) < secondsInYear) {
      if (Math.abs(differenceInCalendarQuarters(later, earlier)) < 4) {
        value = differenceInCalendarQuarters(later, earlier);
        unit = "quarter";
      } else {
        value = differenceInCalendarYears(later, earlier);
        unit = "year";
      }
    } else {
      value = differenceInCalendarYears(later, earlier);
      unit = "year";
    }
  } else {
    unit = options.unit;
    if (unit === "second") {
      value = differenceInSeconds(later, earlier);
    } else if (unit === "minute") {
      value = differenceInMinutes(later, earlier);
    } else if (unit === "hour") {
      value = differenceInHours(later, earlier);
    } else if (unit === "day") {
      value = differenceInCalendarDays(later, earlier);
    } else if (unit === "week") {
      value = differenceInCalendarWeeks(later, earlier);
    } else if (unit === "month") {
      value = differenceInCalendarMonths(later, earlier);
    } else if (unit === "quarter") {
      value = differenceInCalendarQuarters(later, earlier);
    } else {
      value = differenceInCalendarYears(later, earlier);
    }
  }

  const rtf = new Intl.RelativeTimeFormat(options?.locale, {
    numeric: "auto",
    ...options,
  });

  return rtf.format(value, unit);
}
