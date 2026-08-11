import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function pad(value: number, length: number): string {
  return String(value).padStart(length, "0");
}

export function formatRFC7231(date: ZonedDateTime): string {
  const utc = date.withTimeZone("UTC");
  // Temporal dayOfWeek: 1=Mon ... 7=Sun → JS-style index for days[]
  const dayName = days[utc.dayOfWeek === 7 ? 0 : utc.dayOfWeek];
  const dayOfMonth = pad(utc.day, 2);
  const monthName = months[utc.month - 1];
  const year = utc.year;
  const hour = pad(utc.hour, 2);
  const minute = pad(utc.minute, 2);
  const second = pad(utc.second, 2);

  return `${dayName}, ${dayOfMonth} ${monthName} ${year} ${hour}:${minute}:${second} GMT`;
}
