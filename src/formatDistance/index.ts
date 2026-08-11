import { Temporal } from "@js-temporal/polyfill";
import { localizeDistance } from "../_lib/formatDistanceLocale/index.js";
import { compareAsc } from "../compareAsc/index.js";
import { differenceInMonths } from "../differenceInMonths/index.js";
import { differenceInSeconds } from "../differenceInSeconds/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

const minutesInDay = 1440;
const minutesInMonth = 43200;
const minutesInAlmostTwoDays = 2520;

export interface FormatDistanceOptions {
  includeSeconds?: boolean;
  addSuffix?: boolean;
}

export function formatDistance(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: FormatDistanceOptions,
): string {
  const comparison = compareAsc(laterDate, earlierDate) as -1 | 0 | 1;

  const localizeOptions = {
    addSuffix: options?.addSuffix,
    comparison,
  };

  const orderedLater = comparison > 0 ? laterDate : earlierDate;
  const orderedEarlier = comparison > 0 ? earlierDate : laterDate;

  const seconds = Math.abs(
    differenceInSeconds(orderedLater, orderedEarlier, { roundingMethod: "trunc" }),
  );
  const minutes = Math.round(seconds / 60);
  let months: number;

  if (minutes < 2) {
    if (options?.includeSeconds) {
      if (seconds < 5) {
        return localizeDistance("lessThanXSeconds", 5, localizeOptions);
      } else if (seconds < 10) {
        return localizeDistance("lessThanXSeconds", 10, localizeOptions);
      } else if (seconds < 20) {
        return localizeDistance("lessThanXSeconds", 20, localizeOptions);
      } else if (seconds < 40) {
        return localizeDistance("halfAMinute", 0, localizeOptions);
      } else if (seconds < 60) {
        return localizeDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return localizeDistance("xMinutes", 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return localizeDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return localizeDistance("xMinutes", minutes, localizeOptions);
      }
    }
  } else if (minutes < 45) {
    return localizeDistance("xMinutes", minutes, localizeOptions);
  } else if (minutes < 90) {
    return localizeDistance("aboutXHours", 1, localizeOptions);
  } else if (minutes < minutesInDay) {
    const hours = Math.round(minutes / 60);
    return localizeDistance("aboutXHours", hours, localizeOptions);
  } else if (minutes < minutesInAlmostTwoDays) {
    return localizeDistance("xDays", 1, localizeOptions);
  } else if (minutes < minutesInMonth) {
    const days = Math.round(minutes / minutesInDay);
    return localizeDistance("xDays", days, localizeOptions);
  } else if (minutes < minutesInMonth * 2) {
    months = Math.round(minutes / minutesInMonth);
    return localizeDistance("aboutXMonths", months, localizeOptions);
  }

  months = Math.abs(differenceInMonths(orderedLater, orderedEarlier));

  if (months < 12) {
    const nearestMonth = Math.round(minutes / minutesInMonth);
    return localizeDistance("xMonths", nearestMonth, localizeOptions);
  } else {
    const monthsSinceStartOfYear = months % 12;
    const years = Math.trunc(months / 12);

    if (monthsSinceStartOfYear < 3) {
      return localizeDistance("aboutXYears", years, localizeOptions);
    } else if (monthsSinceStartOfYear < 9) {
      return localizeDistance("overXYears", years, localizeOptions);
    } else {
      return localizeDistance("almostXYears", years + 1, localizeOptions);
    }
  }
}
