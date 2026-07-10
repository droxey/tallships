# Calendar button mobile open fix

## Goal
Fix the Add to Calendar button so phone browsers are more likely to hand the generated calendar event to the device calendar/import flow instead of only downloading a blob file.

## Repository review
- Reviewed `README.md`: static no-build Leaflet app; calendar button currently documented as generating a standards-based `.ics` file.
- Reviewed `app.js` calendar helpers: event dates are parsed, `.ics` content is built client-side, and `addToCalendar` currently creates a Blob object URL, clicks a temporary download link, then revokes the URL.
- Existing git status before edits: clean.
- No `AGENTS.md` found under `/workspace/tallships`.

## Task chosen
Small safe task: change only the client-side calendar launch behavior while preserving the existing `.ics` generation.

## Why safe
- No dependency, build, schema, auth, or infrastructure changes.
- Touches only static front-end JavaScript and this run log.
- Keeps existing desktop download behavior as fallback.

## Best practices considered
- Mobile browsers often treat Blob object URLs with `download` as file downloads rather than calendar-import intents.
- `text/calendar` data URLs opened by top-level navigation can more reliably trigger the OS/browser calendar import flow on phones.
- Desktop browsers should keep the predictable `.ics` file download.

## Strategy
- Add a focused mobile user-agent helper.
- Add a data-URL calendar opener for mobile devices.
- Keep Blob + download link as fallback for desktop and if mobile navigation fails synchronously.

## Expected files changed
- `app.js`
- `docs/agent-runs/2026-07-10-2031-calendar-button-mobile-open.md`

## Tests to run
- `git diff --check`
- Static syntax check with `node --check app.js`
- Local smoke check with `python3 -m http.server` and `curl` if practical

## Assumptions
- The app remains a static site with no server-side endpoint for generated `.ics` files.
- Phone calendar import support varies by browser/OS; this improves handoff without guaranteeing every browser opens a native calendar app.

## Risks
- Very long event descriptions could make data URLs larger; current event content is modest.
- Some Android browsers may still download/import via a chooser instead of opening directly in a calendar app.

## Rollback path
Revert the `addToCalendar` changes in `app.js` to the previous Blob download-only implementation.

## Files changed
- `app.js`: split desktop `.ics` download into `downloadCalendarFile`, added `isMobileCalendarTarget`, and changed phone/tablet clicks to top-level navigation to a `text/calendar` data URL.
- `docs/agent-runs/2026-07-10-2031-calendar-button-mobile-open.md`: recorded this controlled run.

## Commands run and results
- `pwd && find .. -name AGENTS.md -print && git status --short && (test -f README.md && sed -n '1,200p' README.md || true)` — reviewed repo root/readme; initial command did not show an AGENTS file.
- `find /workspace/tallships -name AGENTS.md -print; sed -n '1340,1470p' app.js; date -u +%Y-%m-%d-%H%M` — confirmed no repo AGENTS file and reviewed calendar implementation.
- `git status --short` — showed edited `app.js` and new run log after changes.
- `git diff --stat` — showed the small JavaScript change before this log update.
- `git diff --check` — passed; no whitespace errors.
- `node --check app.js` — passed; JavaScript syntax is valid.
- `python3 -m http.server 8080` plus `curl -I http://127.0.0.1:8080/` — passed; static preview served `index.html` with HTTP 200.
- `git diff -- app.js docs/agent-runs/2026-07-10-2031-calendar-button-mobile-open.md` — reviewed targeted diff.

## Diff summary
- Mobile/tablet Add to Calendar now opens `data:text/calendar;charset=utf-8,...` in the current tab to give mobile OS/browser calendar handlers a direct calendar MIME handoff.
- Desktop retains the prior Blob-backed `.ics` file download behavior.

## Verification status
- Static syntax and whitespace checks passed.
- Local static server smoke test passed.
- Native iOS/Android calendar handoff was not physically verified in this environment.

## Commit / PR status
Committed with message `Fix mobile calendar handoff`; PR metadata created with the make_pr tool.
