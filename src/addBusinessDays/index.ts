import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function addBusinessDays(date: ZonedDateTime, amount: number): ZonedDateTime {
  let current = date;
  let remaining = amount;
  const direction = remaining >= 0 ? 1 : -1;
  remaining = Math.abs(remaining);

  while (remaining > 0) {
    current = current.add({ days: direction });
    const dayOfWeek = current.dayOfWeek;
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      remaining--;
    }
  }

  return current;
}
