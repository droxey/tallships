# iPhone calendar open fix

## Goal
Fix the Add to Calendar button so an iPhone click opens the generated `.ics` calendar event through the browser/calendar handoff instead of downloading a file or navigating to a blocked data URL.

## Repository review
- Reviewed `README.md`: static no-build Leaflet app; calendar button generates a standards-based `.ics` file.
- Reviewed prior run log `docs/agent-runs/2026-07-10-2031-calendar-button-mobile-open.md`: previous mobile attempt changed from Blob download to a `data:text/calendar` top-level navigation.
- Reviewed `app.js` calendar functions: `buildIcs`, `downloadCalendarFile`, `isMobileCalendarTarget`, and `addToCalendar`.
- Existing git status before edits: clean.
- No `AGENTS.md` found under `/workspace/tallships` or its parent search path.

## Task chosen
Small safe task: change only the mobile calendar handoff path from a `data:` URL to direct navigation to a `Blob` URL with `text/calendar` MIME type.

## Why safe
- No dependency, build, schema, auth, infrastructure, or data changes.
- Touches only static front-end JavaScript and this run log.
- Desktop `.ics` download behavior remains unchanged.

## Best practices considered
- iOS Safari can block or refuse top-level `data:` URL navigation, even when initiated by a click.
- Adding a `download` attribute nudges browsers toward file download behavior instead of calendar/import handling.
- Direct navigation to a resource with `text/calendar` MIME type gives mobile browsers a better chance to invoke their calendar preview/import flow.

## Strategy
- Add `calendarBlobUrl(ics)` so both desktop download and mobile open paths use the same calendar Blob MIME type.
- Keep `downloadCalendarFile(event, ics)` for desktop with the existing `download` attribute.
- Add `openCalendarFile(ics)` for mobile that navigates the current tab to the Blob URL without a `download` attribute.
- Keep a longer revoke timeout for mobile to avoid revoking before iOS finishes opening the resource.

## Expected files changed
- `app.js`
- `docs/agent-runs/2026-07-10-2109-iphone-calendar-open.md`

## Tests to run
- `git diff --check`
- `node --check app.js`
- Local static server smoke test with `python3 -m http.server` and `curl`

## Assumptions
- The site remains fully static and cannot serve dynamic event-specific `.ics` files from a server endpoint.
- iPhone behavior still depends on the exact iOS/browser version; native device verification is not available in this environment.

## Risks
- Some iOS/browser combinations may still show an intermediate preview/import screen instead of opening Calendar instantly.
- A fully deterministic iPhone Calendar handoff would likely require hosted `.ics` files or server-served `text/calendar` URLs, which is a broader change.

## Rollback path
Revert the `calendarBlobUrl`, `openCalendarFile`, and `addToCalendar` changes in `app.js` to the previous implementation.

## Files changed
- `app.js`: added shared Blob URL creation; mobile Add to Calendar now navigates directly to a `text/calendar` Blob URL without the `download` attribute; desktop download remains unchanged.
- `docs/agent-runs/2026-07-10-2109-iphone-calendar-open.md`: recorded this controlled run.

## Commands run and results
- `pwd && rg --files -g 'AGENTS.md' -g 'README*' -g 'docs/**' -g '*test*' -g '*spec*' | head -200 && git status --short` — reviewed repo context and confirmed clean initial status.
- `find .. -name AGENTS.md -print && git status --short && sed -n '1,220p' README.md` — confirmed no applicable AGENTS file and reviewed README.
- `sed -n '1,260p' app.js` and `sed -n '1360,1540p' app.js` — reviewed event/calendar implementation.
- `rg -n "addToCalendar|downloadCalendarFile|isMobileCalendarTarget|text/calendar|Blob|calendar" app.js` — located calendar-related functions.
- `date -u +%Y-%m-%d-%H%M && git status --short` — captured run timestamp and clean baseline before editing.
- `git diff --check` — passed; no whitespace errors.
- `node --check app.js` — passed; JavaScript syntax is valid.
- `python3 -m http.server 8080` plus `curl -I http://127.0.0.1:8080/` — passed; static preview served `index.html` with HTTP 200.
- `git status --short` — showed edited `app.js` and new run log.
- `git diff --stat` — showed a small focused JavaScript diff before this log update.
- `git diff -- app.js` — reviewed targeted code diff.

## Diff summary
- Replaced iPhone/mobile `data:text/calendar` navigation with `Blob` URL navigation using `text/calendar;charset=utf-8`.
- Avoided the `download` attribute on the mobile path so iOS Safari has a better chance to invoke calendar import/preview handling.
- Preserved existing desktop `.ics` file download behavior.

## Verification status
- Static syntax and whitespace checks passed.
- Local static server smoke test passed.
- Native iPhone Calendar handoff was not physically verified in this environment.

## Commit / PR status
Committed with message `Fix iPhone calendar handoff`; PR metadata created with the make_pr tool.
