# Add Sail Boston ships map link

## Goal
Add an external "See the ships" button below the Tall Ships header that links to Sail Boston's official map.

## Repository review
- Reviewed `README.md`: static Leaflet app with no build step or package install.
- Checked for `AGENTS.md`: none found in `/workspace` or this repository path.
- Reviewed `index.html` header structure and `styles.css` header/button/list spacing styles.
- Verified current Sail Boston map target by web search: `https://www.sailboston.com/map/`.

## Existing git status
Clean before edits.

## Task chosen
Add one header CTA link. This is safe because it changes only static HTML/CSS and does not affect event data or app logic.

## Best practices
- Use an anchor for navigation rather than JavaScript.
- Mark external links with `target="_blank"` and `rel="noopener noreferrer"`.
- Reuse existing button styles and add the smallest scoped CSS needed.
- Preserve accessible link text.

## Strategy
- Add the link under the Tall Ships heading/subtitle in `index.html`.
- Add compact `.brand-link` styling in `styles.css`.
- Increase list panel top padding so the fixed header does not overlap list content after the header gets taller.

## Files changed
- `index.html`
- `styles.css`
- `docs/agent-runs/2026-07-10-2103-see-the-ships-link.md`

## Commands run and results
- `pwd && rg --files -g 'AGENTS.md' -g 'README*' -g 'docs/**' | head -80 && git status --short` — pass.
- `find .. -name AGENTS.md -print && sed -n '1,220p' README.md && git status --short` — pass.
- `sed -n '1,220p' index.html; sed -n '1,220p' styles.css; rg -n "Tall|ships|header|hero|Sail" index.html styles.css app.js` — pass with one harmless shell `printf` option warning from my command formatting.
- Web search for Sail Boston map — pass; found `https://www.sailboston.com/map/`.

## Diff summary
Pending validation at time of initial note.

## Risks
- Header height can vary by viewport; list top padding was increased to reduce overlap risk.
- External Sail Boston URL could change later.

## Rollback
Revert this commit or remove the `.brand-link` anchor/styles and restore prior `.panel-list` padding values.

## Commit/push status
Commit required by system instruction. No push requested.
- `git diff --check` — pass, no whitespace errors.
- `python3` HTML parser smoke check — pass, `index.html` parsed.
- `python3 -m http.server 8080` plus `curl -I http://127.0.0.1:8080/` — pass, returned HTTP 200.
- `curl -I -L https://www.sailboston.com/map/` — pass, official target reachable.
- Screenshot check — warning: no local browser binary or Playwright install available in this container.

## Final diff summary
- Added an external `See the ships` CTA under the Tall Ships header.
- Added scoped CTA styles.
- Increased list-panel top padding for fixed-header clearance.

## Commit/push status
Committed locally on current branch. No push performed.
