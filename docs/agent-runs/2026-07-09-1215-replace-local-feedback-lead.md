# Replace Local-feedback lead event phrasing

## Goal
Replace the event-text phrase `Local-feedback lead` with `according to locals`.

## Repository review
- Reviewed `README.md`; this is a static Leaflet site with event data in `app.js` and no build step.
- Searched the repository for `Local-feedback lead`, `event text`, and related local phrasing.
- No in-scope `AGENTS.md` file was found under `/workspace`.

## Existing git status
- `git status --short` was clean before edits.

## Task chosen
- Minimal text replacement in event data only.

## Why it is safe
- The change updates static display copy and does not alter data structure, dependencies, config, schema, auth, payments, document handling, generated files, or infrastructure.

## Expected files changed
- `app.js`
- `docs/agent-runs/2026-07-09-1215-replace-local-feedback-lead.md`

## Best practices
- Preserve existing object structure and formatting.
- Avoid unrelated reformatting.
- Verify no old phrase remains.
- Run syntax and diff checks appropriate for a no-build static JavaScript app.

## Strategy
- Replace the exact phrase `Local-feedback lead` with `according to locals` across `app.js` event notes.
- Confirm the old phrase is absent and inspect diff.

## Assumptions
- The requested replacement applies to all event notes containing the exact phrase.
- Similar but different wording such as `Boston-local lead` is out of scope.

## Risks
- The replacement changes sentence casing at the start of notes to lowercase, matching the user-provided replacement exactly.

## Rollback path
- Revert this commit or replace `according to locals` back with `Local-feedback lead` in `app.js`.

## Commands run and results
- `find /workspace -name AGENTS.md -print` — no in-scope instructions found.
- `git status --short` — clean before edits.
- `sed -n '1,220p' README.md` — reviewed project instructions.
- `rg -n "Local-feedback lead|event text|local" .` — found target phrase in `app.js` notes.
- `python3` replacement script — replaced exact phrase occurrences.

- `node --check app.js` — pass; JavaScript syntax check completed.
- Python phrase verification — pass; old phrase absent and `according to locals` appears 13 times.
- `python3 -m http.server 4173 --bind 127.0.0.1` plus `curl -I http://127.0.0.1:4173/` — pass; local preview returned HTTP 200.
- `git diff --check` — pass; no whitespace errors.
- Screenshot check — not captured because no browser automation tool (`playwright`, `chromium`, or `google-chrome`) is installed in the environment.

## Final diff summary
- `app.js`: replaced 13 event-note occurrences of `Local-feedback lead` with `according to locals`.
- `docs/agent-runs/2026-07-09-1215-replace-local-feedback-lead.md`: added this run log.

## Commit / push status
- Committed with message `Update local feedback event phrasing`.
- Pull request metadata created with the make_pr tool.
- Push not requested.
