import { getDaysInMonth } from "../getDaysInMonth/index.js";

export function isLastDayOfMonth(date: Parameters<typeof getDaysInMonth>[0]): boolean {
  return date.day === getDaysInMonth(date);
}
