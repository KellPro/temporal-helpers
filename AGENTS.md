# temporal-helpers — Agent Guidelines

Project-specific rules for coding agents. Follow these in addition to any global agent guidelines.

## What this package is

date-fns-compatible helpers for **`Temporal.ZonedDateTime`** only (polyfill: `@js-temporal/polyfill`). Primary consumer intent: Keli DateAPI dual-path routing (ZDT path vs date-fns `Date` path).

Read `README.md` for product gotchas. Read parent `REMAINING_FUNCTIONS.md` (if present) for backlog. Task lore may live under workspace `lore/<name>/`.

## Non-negotiables

1. **Do not silently coerce ZDT → `Date`** inside helpers (except `toLegacyDate`, which is explicit and documented).
2. **Do not add `toDate`.** The export is `toLegacyDate` only.
3. **Months are 1-based** everywhere public (`getMonth`, `setMonth`, `set({ month })`).
4. **Sunday is `dayOfWeek === 7`**, Monday is `1`. Never assume JS `Date#getDay()` numbering.
5. **No new dependencies** unless the user explicitly approves.
6. **No force push. No `git push` without explicit user permission** in the current conversation.
7. **Do not commit** unless the user asks.
8. **Do not expand scope** into `parse`, full `locale/`, `fp/`, `constructFrom`/`transpose`, or PlainDate/PlainTime unless the task says so.

## Code layout

- One function per folder: `src/<name>/index.ts` + `src/<name>/test.ts`.
- Shared code only under `src/_lib/`.
- Export public API from `src/index.ts`.
- Imports use **`.js` extensions** (NodeNext): `from "../addDays/index.js"`.
- Match existing style: minimal comments, no narrating comments, TypeScript `strict`.
- Prefer composing existing helpers over duplicating calendar logic.

## Porting from date-fns

Reference implementation often lives beside this package as `../date-fns` in the workspace clone.

When porting:

1. Change types from `Date` / `DateArg` to `Temporal.ZonedDateTime`.
2. Replace `getTime()` / `+date` with `epochMilliseconds` where instant math is correct.
3. Replace local getters with ZDT fields (`year`, `month`, `day`, `hour`, …).
4. Fix weekday math for Temporal’s 1–7 week.
5. For mixed-zone pairs, follow established decisions:
   - `formatRelative` → project onto **`baseDate.timeZoneId`**
   - `intlFormatDistance` → project onto **`laterDate.timeZoneId`**
   - `*ToNow` → `Temporal.Now.zonedDateTimeISO(date.timeZoneId)`
6. Do **not** reintroduce date-fns default-options globals unless wiring readers is in scope.
7. en-US string tables: copy from date-fns `locale/en-US` when matching wording; keep locale optional only if existing pattern throws on non–en-US (`formatRelative`).

## Known behavioral decisions (do not “fix” casually)

| Area | Decision |
|------|----------|
| `formatDistance*` | Epoch-based diffs; en-US strings; no locale pack |
| `differenceInDays` / `differenceInWeeks` | date-fns calendar semantics: full calendar days (23-hour DST-short day counts as 1); each input anchored in its own zone (wall-clock fields), also for mixed-zone pairs; `roundingMethod` kept |
| `startOfWeek` / `startOfISOWeek` | Week starts are true midnights — every sub-second field zeroed (callers compare week starts by epoch; `with({ nanosecond: 0 })` alone leaves ms/µs residue) |
| Sub-second hygiene (all `start*` / `end*` / `lastDay*` / `each*OfInterval` / `roundToNearest*`) | Temporal's `millisecond` / `microsecond` / `nanosecond` are separate fields: a `with()` that sets only `nanosecond` leaves ms/µs residue. Every boundary helper zeroes (start-side) or completes to 999/999/999 (end-side) all three sub-second fields, so epoch comparisons on their results are stable |
| `differenceInCalendarDays` / `differenceInCalendarWeeks` / `differenceInCalendarISOWeeks` / `differenceInCalendarMonths` / `differenceInCalendarQuarters` / `differenceInCalendarYears` / `differenceInCalendarISOWeekYears` | True wall-clock calendar counts (no epoch division); `differenceInCalendarQuarters` = `years*4 + quarterDiff` like date-fns; `CalendarWeeks` rounds like date-fns (default `round`, explicit `roundingMethod` honored) |
| `differenceInMonths` / `differenceInQuarters` / `differenceInYears` / `differenceInISOWeekYears` | Full-unit check via the native clamped anniversary: `earlierDate.add({ months/years: sign * distance })` (Temporal clamps day-of-month — that IS the February/leap-day handling) reaches `laterDate`, compared by wall-clock fields (each input in its own zone); sign is wall-clock too. Calendar distance itself is `years*12 + months` field math. Diverges from date-fns where its pivot/normalization ignores time-of-day on clamped month/year-end anniversaries (date-fns over-reports by 1 there; ours is addMonths/addYears-consistent); ISO week years restore the earlier date's time of day after `setISOWeekYear` (which resets to midnight) |
| `differenceInHours` / `differenceInMinutes` / `differenceInSeconds` / `differenceInMilliseconds` | Elapsed-based (epoch), which is date-fns parity — do not change to calendar math |
| `-0` prevention | All difference functions that round route through `getRoundingMethod`, which applies `_lib/normalizeZero` (date-fns issue #2555 parity). `differenceInMilliseconds` (integer subtraction) and `differenceInElapsedDays` (BigInt) cannot produce `-0`; the calendar family is pure integer math and cannot either |
| `differenceInElapsedDays` | **Non-date-fns escape hatch**: signed exact elapsed 24-hour days via `epochNanoseconds` (BigInt day division; nanosecond precision; both zones ignored; never `-0`). Intentionally diverges from `differenceInDays` on DST-boundary spans (23-hour span = 0 elapsed vs 1 calendar). Residual divergence from date-fns everywhere in this family: date-fns anchors in the runtime's local zone, this library anchors each input in its own zone |
| `formatRelative` | en-US; other `locale` throws; fallback `MM/dd/yyyy` |
| `set` | 1-based month; dual aliases for day/time; throw if both aliases set |
| `interval` | Throw if start after end; allow equal |
| `intlFormat` | Default `timeZone` = ZDT; options override |
| `intlFormatDistance` | Calendar unit pick (date-fns-like thresholds) |
| `formatRFC7231` | Always UTC GMT |
| `formatRFC3339` | ZDT offset; `+00:00` → `Z` |
| Packaging | Dual build: `npm run build` → `dist/esm` + `dist/cjs`; tests run TS via Vitest |
| Polyfill | `@js-temporal/polyfill` `^0.5.1` (aligned with Keli). No `epochSeconds` / `fromEpochSeconds` / `toZonedDateTime({…})` / `getTimeZone()` — use `epochMilliseconds`, `fromEpochMilliseconds`, `toZonedDateTimeISO`, `timeZoneId` |

## Adding a function (checklist)

1. Confirm it is not an explicit out-of-scope hard item (or get user OK).
2. Implement `src/<name>/index.ts`.
3. Add focused `test.ts` with fixed ZDT fixtures (named IANA zones, not only UTC when zone matters).
4. Export from `src/index.ts`.
5. Run `npm test` from this package root.
6. Update `REMAINING_FUNCTIONS.md` if the item was listed there.
7. Update `README.md` gotchas if behavior is surprising or diverges from date-fns.

## Testing rules

- Runner: **Vitest** (`npm test` / `npm run test:watch`).
- Do not assert brittle full strings against live `now` except coarse suffix/unit checks for `*ToNow`.
- Cover zone-sensitive paths with non-UTC zones (e.g. `Europe/Paris`, `America/New_York`).
- For weekday/week functions, include Sunday and week-boundary cases.

## What “done” looks like for a helper

- Types accept/return ZDT (or documented exception).
- Behavior matches the decision table above where applicable.
- Tests pass in full suite.
- Barrel export present.
- No leftover debug logs; no unused code.

## Build

```bash
npm run build        # tsc ESM + tsc CJS + dist/cjs/package.json
npm run clean
```

- ESM: `tsconfig.esm.json` → `dist/esm/` (NodeNext, keeps `.js` import specifiers)
- CJS: `tsconfig.cjs.json` → `dist/cjs/` + `scripts/write-cjs-package-json.js`
- Root `tsconfig.json` is `noEmit` for editor/typecheck
- Do not hand-edit `dist/`; rebuild after source changes when verifying require/import
- `dist/` is gitignored
- `prepare` → `npm run build` so git/file installs (e.g. Keli) get ESM+CJS without a manual build step

## Out of scope unless tasked

- PlainDate / PlainTime APIs
- date-fns `parse` token engine
- Full locale / `fp` trees
- `getDefaultOptions` / `setDefaultOptions` without call-site demand
- Per-function deep `exports` map (barrel `"."` only unless asked)
