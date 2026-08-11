# temporal-helpers

date-fns-like utility functions for [`Temporal.ZonedDateTime`](https://tc39.es/proposal-temporal/docs/zoneddatetime.html).

Built for Keli’s dual-path DateAPI: the same helper names as date-fns, but arguments and return values are `Temporal.ZonedDateTime` (via `@js-temporal/polyfill`) instead of `Date`.

## Status

- **ZonedDateTime surface:** large date-fns-compatible set implemented (add/sub, differences, start/end, formatters, intervals, etc.).
- **Keli P0/P1:** complete (`formatDistance*`, `add`/`sub` duration entry, `formatRFC3339`).
- **Keli P2 easy wins:** complete (`formatRelative`, `formatISO9075`, `formatRFC7231`, `intlFormat*`, `set`, `interval`, `lightFormat`, `toLegacyDate`).
- **Not goals (yet):** full date-fns locale packs, `fp/`, date-fns `parse`, Date-subclass glue (`constructFrom` / `transpose`), PlainDate/PlainTime APIs.
- **Packaging:** Dual package — ESM under `dist/esm/`, CJS under `dist/cjs/`. Run `npm run build` before publish or git-dep use.

Upstream tracking and remaining work live in the parent workspace file `../REMAINING_FUNCTIONS.md` (when this repo sits next to that file) or the monorepo copy of that document.

## Install / develop

```bash
npm install
npm test
npm run build        # dist/esm + dist/cjs
npm run test:watch
```

Dependency: `@js-temporal/polyfill`.

```ts
// ESM
import { Temporal } from "@js-temporal/polyfill";
import { addDays, formatDistanceToNowStrict, formatRFC3339 } from "temporal-helpers";

// CJS
// const { addDays } = require("temporal-helpers");

const zdt = Temporal.ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
addDays(zdt, 5);
formatDistanceToNowStrict(zdt, { addSuffix: true });
formatRFC3339(zdt);
```

| Field | Path |
|--------|------|
| `main` (require) | `dist/cjs/index.js` |
| `module` / `import` | `dist/esm/index.js` |
| `types` | `dist/esm/index.d.ts` |

`dist/cjs/package.json` sets `"type": "commonjs"` so Node treats the CJS tree correctly while the package root stays `"type": "module"`.

`prepare` runs `npm run build`, so `dist/` is produced on `npm install` (including git dependencies for Keli). TypeScript must be installable as a devDependency of this package for that to succeed.

## Layout

```
src/
  <functionName>/
    index.ts    # implementation
    test.ts     # vitest
  _lib/         # shared internals (rounding, distance locale, …)
  index.ts      # public barrel exports
```

One folder per helper, matching date-fns style. Export new public APIs from `src/index.ts`.

## Design principles

1. **Input/output is ZonedDateTime** (unless the helper is intentionally non-date, or `toLegacyDate`).
2. **Names match date-fns** where behavior is close enough for a DateAPI router.
3. **No silent coerce to `Date`.** Missing helpers should fail visibly at the router, not drop the time zone.
4. **en-US strings by default** for wordy formatters (`formatDistance*`, `formatRelative`). Full locale packs are out of scope.
5. **Prefer Temporal operations** (`add`, `with`, `withTimeZone`, epoch fields) over reimplementing calendar math in plain numbers—except where date-fns threshold tables must be ported for string parity.

## Gotchas (read before porting or calling)

### Temporal ≠ `Date`

| Topic | date-fns / `Date` | This library / Temporal |
|--------|-------------------|-------------------------|
| Month index | 0–11 | **1–12** |
| Sunday | `getDay() === 0` | `dayOfWeek === 7` (Monday = 1) |
| Time zone | Often local / offset hacks | First-class `timeZoneId` on every ZDT |
| Invalid dates | `Invalid Date` | Temporal throws or constrains; see `isExists` |

### `set` is not full date-fns parity

- **Months are 1-based** (`month: 1` = January), same as `getMonth` / `setMonth` here.
- Day-of-month: both `day` and `date` accepted; **throw if both** are passed.
- Time fields: singular and plural (`hour`/`hours`, …); **throw if both** forms of the same unit are passed.

### Distance and “now”

- `formatDistance` / `formatDistanceStrict` use **absolute (epoch) differences**, not date-fns DST wall-offset adjustments.
- `formatDistanceToNow*` builds now as `Temporal.Now.zonedDateTimeISO(date.timeZoneId)` so “now” matches the argument’s zone.
- Distance **wording** is hardcoded en-US (date-fns en-US tables).

### `formatRelative`

- en-US only; `locale` other than `en-US` **throws**.
- Both dates are projected onto **`baseDate.timeZoneId`** before calendar-day comparison.
- Outside ±6 days → `format(..., "MM/dd/yyyy")`.
- `weekStartsOn` defaults to `0` (Sunday) like date-fns.

### Intl helpers

- `intlFormat`: default `timeZone` is the ZDT’s zone; options may override.
- `intlFormatDistance`: unit picking follows date-fns-style **calendar** helpers; mixed zones are projected onto **`laterDate.timeZoneId`**.

### Intervals

- `interval(start, end)` returns `{ start, end }`.
- **Throws** if `start` is after `end` (by epoch). Equal endpoints are allowed.
- There is no Temporal `Interval` type—only this plain object (also used by `each*OfInterval` / `isWithinInterval`).

### Legacy `Date`

- Use **`toLegacyDate(zdt)`** → `new Date(zdt.epochMilliseconds)`.
- **No `toDate` export.** Zone is discarded. Keli may map DateAPI `toDate` → `toLegacyDate`.

### Formatters

- `format` is a **small** token set (not full date-fns `format`).
- `formatRFC3339`: local fields + offset; zero offset normalized to `Z`.
- `formatRFC7231`: always **UTC** + `GMT` (RFC requirement).
- `formatISO9075`: SQL-style `YYYY-MM-DD HH:mm:ss` (space, no offset).
- `lightFormat`: limited tokens (`y M d a h H m s S`) with quote escaping; unescaped latin letters throw.

### `add` / `sub` duration objects

- Reuse the `Duration` shape from `intervalToDuration` (`years`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`, `milliseconds`).
- Apply calendar units before time units (years/months → weeks/days → time), like date-fns.

### Week helpers and Temporal `dayOfWeek`

Any port that touches weeks or weekdays must translate **Sunday = 7**, not 0. Several historical bugs were exactly this (`isSunday`, `startOfWeek`, `nextSunday` / `previousSunday`).

### “This” helpers and zone

`isThisHour` / `isThisWeek` / etc. must compare against “now” in **the date’s time zone**, not the host local zone alone.

## Testing

```bash
npm test
```

- Vitest, Node environment.
- Prefer fixed `ZonedDateTime.from("...[Zone]")` fixtures over wall-clock `now` except for thin `*ToNow` wrappers.
- When porting date-fns tests, convert `Date` constructors carefully (month index, zone).

## Related docs

- `AGENTS.md` — rules for coding agents working in this repo
- Parent workspace `REMAINING_FUNCTIONS.md` — backlog (PlainDate/PlainTime, non-date converters, hard P2)
- `lore/` (workspace) — task decisions and plans when developed from the monorepo layout

## License

MIT (see `LICENSE.md`).
