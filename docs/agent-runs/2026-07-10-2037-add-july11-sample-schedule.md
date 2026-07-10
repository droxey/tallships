# Add July 11 sample schedule

## Goal
Add the user-provided Sail Boston sample schedule for tomorrow, Saturday, July 11, 2026.

## Repository review
- Reviewed prior conversation and latest commit context: previous change adjusted mobile Add to Calendar behavior; no inline diff comments were available in this environment.
- Reviewed `README.md`: static no-build site; event data lives in `app.js`.
- Reviewed `app.js`: `SAMPLE_SCHEDULES` already contains `sample-schedule-july11`; the smallest safe change is to replace its brief notes with the detailed user-provided schedule.
- Existing git status before edits: clean.
- No `AGENTS.md` found under `/workspace/tallships`.

## Task chosen
Update only the existing July 11 sample schedule content instead of adding a duplicate event.

## Why safe
- Content-only static data change.
- No dependencies, generated files, infrastructure, schema, auth, or payment changes.
- Avoids duplicate July 11 sample schedule cards.

## Best practices considered
- Preserve the existing event shape used by the list, map marker, detail sheet, sharing, and calendar generation.
- Keep the provided schedule in the `notes` field where detailed itinerary text is displayed.
- Keep date, address, coordinates, type, and reservation metadata unchanged.

## Strategy
- Replace `sample-schedule-july11.notes` with the exact sequence of activities from the user-provided table, formatted as readable time-prefixed lines.
- Run static syntax, diff, and local preview checks.

## Expected files changed
- `app.js`
- `styles.css`
- `docs/agent-runs/2026-07-10-2037-add-july11-sample-schedule.md`

## Tests to run
- `git diff --check`
- `node --check app.js`
- `python3 -m http.server 8080` + `curl -I http://127.0.0.1:8080/`

## Assumptions
- "Tomorrow" means Saturday, July 11, 2026, based on the provided current date of Friday, July 10, 2026.
- The detailed schedule should replace the existing July 11 sample itinerary, not create a second competing sample schedule.

## Risks
- Long notes now preserve line breaks in the detail sheet; this affects all event notes but only when notes include newline characters.

## Rollback path
Revert this content update in `sample-schedule-july11.notes`.


## Files changed
- `app.js`: replaced the July 11 sample itinerary notes with the user-provided Saturday schedule.
- `styles.css`: preserved newline breaks in event notes so the schedule displays as separate lines.
- `docs/agent-runs/2026-07-10-2037-add-july11-sample-schedule.md`: recorded this controlled run.

## Commands run and results
- `pwd && find /workspace/tallships -name AGENTS.md -print && git status --short && sed -n '1,160p' README.md && rg -n "SAMPLE_SCHEDULES|sample schedule|Parade|July 11|2026-07-11|schedule" app.js docs -S` — reviewed repo state, README, and existing schedule data; git status was clean.
- `sed -n '860,930p' app.js; sed -n '930,990p' app.js` — inspected existing `SAMPLE_SCHEDULES` entries.
- `node --check app.js` — passed before edits; existing JavaScript syntax was valid.
- `date -u +%Y-%m-%d-%H%M` — generated the run log timestamp.
- `git status --short && git diff --stat && git diff --check && node --check app.js` — passed after content/CSS edits; showed `app.js`, `styles.css`, and this run log changed.
- `python3 -m http.server 8080` plus `curl -I http://127.0.0.1:8080/` — passed; static preview served `index.html` with HTTP 200.
- `python3 - <<'PY' ... import playwright ... PY` — warning; Playwright is not installed, so an automated browser screenshot could not be captured.
- `command -v chromium || command -v google-chrome || command -v firefox || command -v wkhtmltoimage || true` — warning; no browser/screenshot binary was available in the environment.
- `node - <<'NODE' ... NODE` — passed; verified key July 11 schedule strings exist and `.notes` preserves line breaks.
- `git diff -- app.js styles.css docs/agent-runs/2026-07-10-2037-add-july11-sample-schedule.md` — reviewed targeted diff.

## Diff summary
- Replaced the existing July 11 sample schedule notes with the user-provided Saturday timeline.
- Added `white-space: pre-line` to event notes so the timeline appears on separate lines in the detail sheet.

## Verification status
- Static syntax, whitespace, content, and local server checks passed.
- Automated screenshot was not possible because no browser/screenshot tooling is installed in this container.

## Commit / PR status
Committed with message `Add July 11 sample schedule`; PR metadata created with the make_pr tool.
