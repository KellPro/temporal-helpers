import { Temporal } from "@js-temporal/polyfill";
import { getWeek } from "../getWeek/index.js";
import { getWeekYear } from "../getWeekYear/index.js";

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

// date-fns en-US "short" width, used by EEEEEE. Indexed Monday=0 … Sunday=6.
const WEEKDAYS_PAIR = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

// One combined pass: substitution output is never re-scanned.
// Alternatives are order-sensitive (first match wins at each position):
//   1. ([dDMQwY]o)       ordinal pair (do, Do, Mo, Qo, wo, Yo) — must beat the
//                        letter run, or Do splits into D + a lone o
//   2. ('(?:''|[^'])*')  quoted literal; '' inside is an escaped quote
//   3. ([a-zA-Z])\3*     run of one identical letter; match.length picks
//                        the token width (MMMM -> length 4)
//   4. ([\s\S])          any other single character is literal; also where
//                        an unterminated ' or unknown letter surfaces
const MASK_PATTERN = /([dDMQwY]o)|('(?:''|[^'])*')|([a-zA-Z])\3*|([\s\S])/g;

function pad(value: number, length: number): string {
  const sign = value < 0 ? "-" : "";
  return sign + String(Math.abs(value)).padStart(length, "0");
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
  if (length === 5) return MONTHS_NARROW[date.month - 1];
  return MONTHS_LONG[date.month - 1];
}

function renderWeekday(date: ZonedDateTime, length: number): string {
  const index = date.dayOfWeek - 1;
  if (length <= 3) return WEEKDAYS_SHORT[index];
  if (length === 5) return WEEKDAYS_NARROW[index];
  if (length === 6) return WEEKDAYS_PAIR[index];
  return WEEKDAYS_LONG[index];
}

function renderQuarter(date: ZonedDateTime, length: number): string {
  const quarter = Math.ceil(date.month / 3);
  if (length === 1 || length === 5) return String(quarter);
  if (length === 2) return pad(quarter, 2);
  if (length === 3) return `Q${quarter}`;
  return `${quarter}${ordinalSuffix(quarter)} quarter`;
}

function renderDayPeriod(date: ZonedDateTime, length: number): string {
  const isAM = date.hour < 12;
  if (length <= 2) return isAM ? "AM" : "PM";
  if (length === 3) return isAM ? "am" : "pm";
  if (length === 5) return isAM ? "a" : "p";
  return isAM ? "a.m." : "p.m.";
}

function renderEra(date: ZonedDateTime, length: number): string {
  const isAD = date.year > 0;
  if (length <= 3) return isAD ? "AD" : "BC";
  if (length === 5) return isAD ? "A" : "B";
  return isAD ? "Anno Domini" : "Before Christ";
}

function renderISOOffset(offset: string, length: number): string {
  const sign = offset[0];
  const hours = offset.slice(1, 3);
  const minutes = offset.slice(4, 6);
  if (length === 1) {
    return minutes === "00" ? `${sign}${hours}` : `${sign}${hours}${minutes}`;
  }
  if (length === 2 || length === 4) return `${sign}${hours}${minutes}`;
  return `${sign}${hours}:${minutes}`;
}

function renderOffset(offset: string, length: number, zeroAsZ: boolean): string {
  const isZero = offset === "+00:00" || offset === "-00:00";
  if (isZero && zeroAsZ) return "Z";
  return renderISOOffset(isZero ? "+00:00" : offset, length);
}

function renderGMTOffset(offset: string, length: number): string {
  const sign = offset.startsWith("-") ? "-" : "+";
  const hours = Number(offset.slice(1, 3));
  const minutes = Number(offset.slice(4, 6));
  if (length <= 3) {
    if (minutes === 0) return `GMT${sign}${hours}`;
    return `GMT${sign}${hours}:${pad(minutes, 2)}`;
  }
  return `GMT${sign}${pad(hours, 2)}:${pad(minutes, 2)}`;
}

type TokenRenderer = (date: ZonedDateTime, length: number) => string;

const RENDERERS: Record<string, TokenRenderer> = {
  y: (date, length) => renderYearLike(date.year, length),
  Y: (date, length) => renderYearLike(getWeekYear(date), length),
  L: renderMonth,
  M: renderMonth,
  d: (date, length) => pad(date.day, length),
  D: (date, length) => pad(date.dayOfYear, length),
  E: renderWeekday,
  Q: renderQuarter,
  q: renderQuarter,
  w: (date, length) => pad(getWeek(date), length),
  h: (date, length) => pad(date.hour % 12 || 12, length),
  H: (date, length) => pad(date.hour, length),
  m: (date, length) => pad(date.minute, length),
  s: (date, length) => pad(date.second, length),
  S: (date, length) =>
    pad(Math.trunc(date.millisecond * 10 ** (length - 3)), length),
  a: renderDayPeriod,
  G: renderEra,
  t: (date, length) => pad(Math.trunc(date.epochMilliseconds / 1000), length),
  T: (date, length) => pad(date.epochMilliseconds, length),
  X: (date, length) => renderOffset(date.offset, length, true),
  x: (date, length) => renderOffset(date.offset, length, false),
  z: (date, length) => renderGMTOffset(date.offset, length),
  O: (date, length) => renderGMTOffset(date.offset, length),
};

const ORDINAL_RENDERERS: Record<string, (date: ZonedDateTime) => string> = {
  d: (date) => ordinal(date.day),
  D: (date) => ordinal(date.dayOfYear),
  M: (date) => ordinal(date.month),
  Q: (date) => ordinal(Math.ceil(date.month / 3)),
  w: (date) => ordinal(getWeek(date)),
  Y: (date) => ordinal(getWeekYear(date)),
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
