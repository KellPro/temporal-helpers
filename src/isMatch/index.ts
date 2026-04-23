import { Temporal } from "@js-temporal/polyfill";

export function isMatch(dateString: string, formatStr: string): boolean {
  try {
    const withTz = dateString.includes("[") 
      ? dateString 
      : `${dateString}T00:00:00[UTC]`;
    Temporal.ZonedDateTime.from(withTz);
    return true;
  } catch {
    return false;
  }
}
