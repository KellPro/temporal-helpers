import { isLeapYear } from "../isLeapYear/index.js";

export function getDaysInYear(date: Parameters<typeof isLeapYear>[0]): number {
  return isLeapYear(date) ? 366 : 365;
}
