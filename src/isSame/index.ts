import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export type DateUnit = "year" | "month" | "day" | "hour" | "minute" | "second";

export function isSame(date: ZonedDateTime, dateToCompare: ZonedDateTime, unit: DateUnit = "day"): boolean {
  switch (unit) {
    case "year":
      return date.year === dateToCompare.year;
    case "month":
      return date.year === dateToCompare.year && date.month === dateToCompare.month;
    case "day":
      return date.year === dateToCompare.year &&
        date.month === dateToCompare.month &&
        date.day === dateToCompare.day;
    case "hour":
      return date.year === dateToCompare.year &&
        date.month === dateToCompare.month &&
        date.day === dateToCompare.day &&
        date.hour === dateToCompare.hour;
    case "minute":
      return date.year === dateToCompare.year &&
        date.month === dateToCompare.month &&
        date.day === dateToCompare.day &&
        date.hour === dateToCompare.hour &&
        date.minute === dateToCompare.minute;
    case "second":
      return date.year === dateToCompare.year &&
        date.month === dateToCompare.month &&
        date.day === dateToCompare.day &&
        date.hour === dateToCompare.hour &&
        date.minute === dateToCompare.minute &&
        date.second === dateToCompare.second;
  }
}
