# Float See the Ships Button

## Goal
Float the **See the ships** button to the right side of the brand row and align it vertically with the logo.

## Repository review
- Reviewed `README.md`: static HTML/CSS/JS site with no build step and local preview via `python3 -m http.server 8080`.
- Reviewed `index.html`, `styles.css`, and relevant filter/list code in `app.js` to locate the topbar/brand controls.
- No `AGENTS.md` file was found under `/workspace`.

## Existing git status
- Baseline `git status --short`: clean.

## Task chosen
- Chosen task: layout-only adjustment for the brand CTA.
- Why safe: contained to the header markup and CSS; no data, dependency, schema, infrastructure, or JavaScript behavior changes.

## Best practices and strategy
- Keep the CTA inside the existing `.brand` flex row so it remains semantically grouped with the title.
- Move the link out of the text copy wrapper and make it a flex item.
- Use `margin-left: auto` to float the CTA to the right without absolute positioning.
- Preserve existing button classes and external-link behavior.

## Files changed
- `index.html`: moved the **See the ships** link beside the title copy inside the brand row.
- `styles.css`: added `.brand-copy` min-width protection and changed `.brand-link` from stacked margin to right-floating flex spacing.

## Commands run and results
- `pwd && find /workspace -name AGENTS.md -print && git status --short && rg --files ...` — reviewed repo location, instructions, status, and project docs.
- `sed -n '1,220p' README.md` — reviewed project overview and local preview instructions.
- `sed -n '1,220p' index.html`, `sed -n '1,260p' styles.css`, `sed -n '620,920p' styles.css` — inspected relevant header and responsive CSS.
- `python3` inline edit script — updated markup/CSS minimally.
- `git diff -- index.html styles.css` — reviewed targeted diff.
- `git status --short` — confirmed only intended files changed before adding this run log.
- `git diff --stat` — reviewed diff size.
- `git diff --check` — passed; no whitespace errors.
- `python3 -m http.server 8080` + `curl -I http://127.0.0.1:8080/` — passed; static page returned HTTP 200.
- `which chromium || which chromium-browser || which google-chrome || which playwright ...` — screenshot not taken because no browser or Playwright runtime is installed in the environment.

## Diff summary
- `index.html`: 4 changed lines.
- `styles.css`: 6 changed lines.

## Risks
- On very narrow screens, the title row has less horizontal room because the CTA now shares the row with the logo and copy. The text wrapper has `min-width: 0` to avoid overflow pressure.

## Rollback
- Revert the commit that contains this change, or restore `index.html` and `styles.css` from the previous revision.

## Commit / push status
- Commit pending at time of log creation.
- No push requested or performed.
