import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface RoundToNearestHoursOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

const ROUNDING_MODES = {
  ceil: "ceil",
  floor: "floor",
  round: "halfExpand",
  trunc: "trunc",
} as const;

export function roundToNearestHours(date: ZonedDateTime, options?: RoundToNearestHoursOptions): ZonedDateTime {
  const roundingMethod = options?.roundingMethod ?? "round";
  return date.round({
    smallestUnit: "hour",
    roundingMode: ROUNDING_MODES[roundingMethod],
  });
}
