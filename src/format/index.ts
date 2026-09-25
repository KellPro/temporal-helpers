import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTHS_NARROW = [
  "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D",
];

const WEEKDAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WEEKDAYS_LONG = [
  "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday", "Sunday",
];

const WEEKDAYS_NARROW = ["M", "T", "W", "T", "F", "S", "S"];

// One combined pass: substitution output is never re-scanned.
// Alternatives are order-sensitive (first match wins at each position):
//   1. ([dMQwY]o)        ordinal pair (do, Mo, Qo, wo, Yo) — must beat the
//                        letter run, or the "o" renders as day-of-year
//   2. ('(?:''|[^'])*')  quoted literal; '' inside is an escaped quote
//   3. ([a-zA-Z])\3*     run of one identical letter; match.length picks
//                        the token width (MMMM -> length 4)
//   4. ([\s\S])          any other single character is literal; also where
//                        an unterminated ' or unknown letter surfaces
const MASK_PATTERN = /([dMQwY]o)|('(?:''|[^'])*')|([a-zA-Z])\3*|([\s\S])/g;

function pad(value: number, length: number): string {
  return String(value).padStart(length, "0");
}

function modulo(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

function ordinalSuffix(value: number): string {
  const remainder = Math.abs(value) % 100;
  if (remainder >= 11 && remainder <= 13) return "th";
  switch (Math.abs(value) % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

function ordinal(value: number): string {
  return `${value}${ordinalSuffix(value)}`;
}

function daysFromCivil(year: number, month: number, day: number): number {
  const adjustedYear = year - (month <= 2 ? 1 : 0);
  const era = Math.floor(adjustedYear / 400);
  const yearOfEra = adjustedYear - era * 400;
  const dayOfYear =
    Math.floor((153 * (month + (month > 2 ? -3 : 9)) + 2) / 5) + day - 1;
  const dayOfEra =
    yearOfEra * 365 +
    Math.floor(yearOfEra / 4) -
    Math.floor(yearOfEra / 100) +
    dayOfYear;
  return era * 146097 + dayOfEra - 719468;
}

function weekdayFromCivilDay(civilDay: number): number {
  return modulo(civilDay + 3, 7) + 1;
}

function sundayStartCivilDay(year: number, month: number, day: number): number {
  const civilDay = daysFromCivil(year, month, day);
  return civilDay - (weekdayFromCivilDay(civilDay) % 7);
}

function weekYearOf(date: ZonedDateTime): number {
  const year = date.year;
  const civilDay = daysFromCivil(year, date.month, date.day);
  if (civilDay < sundayStartCivilDay(year, 1, 1)) return year - 1;
  if (civilDay >= sundayStartCivilDay(year + 1, 1, 1)) return year + 1;
  return year;
}

function weekNumberOf(date: ZonedDateTime): number {
  const weekYear = weekYearOf(date);
  const civilDay = daysFromCivil(date.year, date.month, date.day);
  const weekOneStart = sundayStartCivilDay(weekYear, 1, 1);
  return Math.floor((civilDay - weekOneStart) / 7) + 1;
}

function isAsciiLetter(character: string): boolean {
  return (
    (character >= "a" && character <= "z") ||
    (character >= "A" && character <= "Z")
  );
}

function unquote(quoted: string): string {
  const inner = quoted.slice(1, -1).replace(/''/g, "'");
  return inner === "" ? "'" : inner;
}

function renderYearLike(year: number, length: number): string {
  if (length === 2) return pad(modulo(year, 100), 2);
  return pad(year, length);
}

function renderMonth(date: ZonedDateTime, length: number): string {
  if (length === 1) return String(date.month);
  if (length === 2) return pad(date.month, 2);
  if (length === 3) return MONTHS_SHORT[date.month - 1];
  if (length === 4) return MONTHS_LONG[date.month - 1];
  return MONTHS_NARROW[date.month - 1];
}

function renderWeekday(date: ZonedDateTime, length: number): string {
  if (length === 4) return WEEKDAYS_LONG[date.dayOfWeek - 1];
  if (length >= 5) return WEEKDAYS_NARROW[date.dayOfWeek - 1];
  return WEEKDAYS_SHORT[date.dayOfWeek - 1];
}

function renderQuarter(date: ZonedDateTime, length: number): string {
  const quarter = Math.ceil(date.month / 3);
  if (length === 1) return String(quarter);
  if (length === 2) return pad(quarter, 2);
  if (length === 3) return `Q${quarter}`;
  if (length === 4) return `${quarter}${ordinalSuffix(quarter)} quarter`;
  return String(quarter);
}

function renderDayPeriod(date: ZonedDateTime, length: number): string {
  const isAM = date.hour < 12;
  if (length <= 3) return isAM ? "AM" : "PM";
  if (length === 4) return isAM ? "a.m." : "p.m.";
  return isAM ? "a" : "p";
}

function renderEra(date: ZonedDateTime, length: number): string {
  const isAD = date.year > 0;
  if (length <= 3) return isAD ? "AD" : "BC";
  if (length === 4) return isAD ? "Anno Domini" : "Before Christ";
  return isAD ? "A" : "B";
}

function renderOffset(offset: string, length: number, zeroAsZ: boolean): string {
  if (offset === "+00:00" || offset === "-00:00") {
    if (zeroAsZ) return "Z";
    if (length === 1) return "+00";
    if (length === 2) return "+0000";
    return "+00:00";
  }
  const sign = offset[0];
  const hours = offset.slice(1, 3);
  const minutes = offset.slice(4, 6);
  if (length === 1 && minutes === "00") return `${sign}${hours}`;
  if (length <= 2) return `${sign}${hours}${minutes}`;
  return `${sign}${hours}:${minutes}`;
}

type TokenRenderer = (date: ZonedDateTime, length: number) => string;

const RENDERERS: Record<string, TokenRenderer> = {
  y: (date, length) => renderYearLike(date.year, length),
  Y: (date, length) => renderYearLike(weekYearOf(date), length),
  L: renderMonth,
  M: renderMonth,
  d: (date, length) => (length === 1 ? String(date.day) : pad(date.day, 2)),
  E: renderWeekday,
  Q: renderQuarter,
  q: renderQuarter,
  w: (date, length) => {
    const week = weekNumberOf(date);
    return length === 1 ? String(week) : pad(week, 2);
  },
  h: (date, length) => {
    const hour12 = date.hour % 12 || 12;
    return length === 1 ? String(hour12) : pad(hour12, 2);
  },
  H: (date, length) => (length === 1 ? String(date.hour) : pad(date.hour, 2)),
  m: (date, length) =>
    length === 1 ? String(date.minute) : pad(date.minute, 2),
  s: (date, length) =>
    length === 1 ? String(date.second) : pad(date.second, 2),
  S: (date, length) =>
    pad(date.millisecond, 3).slice(0, Math.min(length, 3)),
  a: renderDayPeriod,
  G: renderEra,
  o: (date) => ordinal(date.dayOfYear),
  t: (date) => String(Math.floor(date.epochMilliseconds / 1000)),
  T: (date) => String(date.epochMilliseconds),
  X: (date, length) => renderOffset(date.offset, length, true),
  x: (date, length) => renderOffset(date.offset, length, false),
};

const ORDINAL_RENDERERS: Record<string, (date: ZonedDateTime) => string> = {
  d: (date) => ordinal(date.day),
  M: (date) => ordinal(date.month),
  Q: (date) => ordinal(Math.ceil(date.month / 3)),
  w: (date) => ordinal(weekNumberOf(date)),
  Y: (date) => ordinal(weekYearOf(date)),
};

export function format(date: ZonedDateTime, mask: string): string {
  return mask.replace(MASK_PATTERN, (match, ordinalBase, quoted) => {
    if (ordinalBase) return ORDINAL_RENDERERS[ordinalBase[0]](date);
    if (quoted) return unquote(quoted);
    if (match === "'") {
      throw new Error(
        "Format mask contains an unterminated single-quoted literal.",
      );
    }
    const letter = match[0];
    if (!isAsciiLetter(letter)) return match;
    const renderer = RENDERERS[letter];
    if (!renderer) {
      throw new Error(
        `Format mask contains an unescaped latin alphabet character: ${letter}`,
      );
    }
    return renderer(date, match.length);
  });
}
