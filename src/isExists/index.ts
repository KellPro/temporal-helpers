import { Temporal } from "@js-temporal/polyfill";

export function isExists(year: number, month: number, day: number): boolean {
  try {
    const dt = Temporal.ZonedDateTime.from({ year, month, day, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0, timeZone: "UTC" });
    return dt.year === year && dt.month === month && dt.day === day;
  } catch {
    return false;
  }
}
