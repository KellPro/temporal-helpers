import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface RoundToNearestMinutesOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

const ROUNDING_MODES = {
  ceil: "ceil",
  floor: "floor",
  round: "halfExpand",
  trunc: "trunc",
} as const;

export function roundToNearestMinutes(date: ZonedDateTime, options?: RoundToNearestMinutesOptions): ZonedDateTime {
  const roundingMethod = options?.roundingMethod ?? "round";
  return date.round({
    smallestUnit: "minute",
    roundingMode: ROUNDING_MODES[roundingMethod],
  });
}
