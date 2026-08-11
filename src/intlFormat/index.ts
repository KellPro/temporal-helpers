import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export type IntlFormatFormatOptions = Intl.DateTimeFormatOptions;

export interface IntlFormatLocaleOptions {
  locale?: string | string[];
}

export function intlFormat(date: ZonedDateTime): string;
export function intlFormat(
  date: ZonedDateTime,
  localeOptions: IntlFormatLocaleOptions,
): string;
export function intlFormat(
  date: ZonedDateTime,
  formatOptions: IntlFormatFormatOptions,
): string;
export function intlFormat(
  date: ZonedDateTime,
  formatOptions: IntlFormatFormatOptions,
  localeOptions: IntlFormatLocaleOptions,
): string;
export function intlFormat(
  date: ZonedDateTime,
  formatOrLocale?: IntlFormatFormatOptions | IntlFormatLocaleOptions,
  localeOptions?: IntlFormatLocaleOptions,
): string {
  let formatOptions: IntlFormatFormatOptions | undefined;

  if (isFormatOptions(formatOrLocale)) {
    formatOptions = formatOrLocale;
  } else {
    localeOptions = formatOrLocale;
  }

  const resolvedFormat: IntlFormatFormatOptions = {
    ...formatOptions,
    timeZone: formatOptions?.timeZone ?? date.timeZoneId,
  };

  return new Intl.DateTimeFormat(
    localeOptions?.locale,
    resolvedFormat,
  ).format(new Date(date.epochMilliseconds));
}

function isFormatOptions(
  opts: IntlFormatLocaleOptions | IntlFormatFormatOptions | undefined,
): opts is IntlFormatFormatOptions {
  return opts !== undefined && !("locale" in opts);
}
