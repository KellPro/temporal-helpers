import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";
import { localizeDistance } from "../_lib/formatDistanceLocale/index.js";
import { compareAsc } from "../compareAsc/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

const millisecondsInMinute = 60000;
const minutesInDay = 1440;
const minutesInMonth = 43200;
const minutesInYear = 525600;

export type FormatDistanceStrictUnit =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "month"
  | "year";

export interface FormatDistanceStrictOptions {
  addSuffix?: boolean;
  unit?: FormatDistanceStrictUnit;
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function formatDistanceStrict(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: FormatDistanceStrictOptions,
): string {
  const comparison = compareAsc(laterDate, earlierDate) as -1 | 0 | 1;

  const localizeOptions = {
    addSuffix: options?.addSuffix,
    comparison,
  };

  const orderedLater = comparison > 0 ? laterDate : earlierDate;
  const orderedEarlier = comparison > 0 ? earlierDate : laterDate;

  const roundingMethod = getRoundingMethod(options?.roundingMethod ?? "round");

  const milliseconds = Math.abs(
    orderedLater.epochMilliseconds - orderedEarlier.epochMilliseconds,
  );
  const minutes = milliseconds / millisecondsInMinute;

  const defaultUnit = options?.unit;
  let unit: FormatDistanceStrictUnit;
  if (!defaultUnit) {
    if (minutes < 1) {
      unit = "second";
    } else if (minutes < 60) {
      unit = "minute";
    } else if (minutes < minutesInDay) {
      unit = "hour";
    } else if (minutes < minutesInMonth) {
      unit = "day";
    } else if (minutes < minutesInYear) {
      unit = "month";
    } else {
      unit = "year";
    }
  } else {
    unit = defaultUnit;
  }

  if (unit === "second") {
    const seconds = roundingMethod(milliseconds / 1000);
    return localizeDistance("xSeconds", seconds, localizeOptions);
  } else if (unit === "minute") {
    const roundedMinutes = roundingMethod(minutes);
    return localizeDistance("xMinutes", roundedMinutes, localizeOptions);
  } else if (unit === "hour") {
    const hours = roundingMethod(minutes / 60);
    return localizeDistance("xHours", hours, localizeOptions);
  } else if (unit === "day") {
    const days = roundingMethod(minutes / minutesInDay);
    return localizeDistance("xDays", days, localizeOptions);
  } else if (unit === "month") {
    const months = roundingMethod(minutes / minutesInMonth);
    return months === 12 && defaultUnit !== "month"
      ? localizeDistance("xYears", 1, localizeOptions)
      : localizeDistance("xMonths", months, localizeOptions);
  } else {
    const years = roundingMethod(minutes / minutesInYear);
    return localizeDistance("xYears", years, localizeOptions);
  }
}
