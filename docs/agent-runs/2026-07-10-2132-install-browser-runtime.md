# Install Browser Runtime for Screenshot Testing

## Goal
Install a working browser runtime in the test environment so screenshot capture can be used during validation.

## Repository review
- Reviewed `README.md`: this is a static site with no package install or build step required for normal app usage.
- Reviewed latest commit context: previous change was a visual header alignment update that could not be screenshotted because no browser runtime was available.
- No `AGENTS.md` file was found under `/workspace`.

## Existing git status
- Baseline `git status --short`: clean.

## Task chosen
- Chosen task: install Playwright Chromium runtime and host dependencies in the current environment, then prove screenshot capture works.
- Why safe: no app source, dependency manifest, lockfile, generated asset, secret, schema, or infrastructure file needs to change. The only repository change is this run log.

## Best practices and strategy
- Avoid adding a package manifest or lockfile to a static no-build repo.
- Use `npx --yes playwright@1.54.2` so the browser runtime can be installed and invoked without changing project dependencies.
- Install Chromium first, then install missing host libraries when Playwright reports them.
- Verify with the same local preview flow documented in `README.md`, then capture a mobile-width screenshot.

## Files changed
- `docs/agent-runs/2026-07-10-2132-install-browser-runtime.md`: recorded the browser runtime install and screenshot verification.

## Commands run and results
- `find /workspace -name AGENTS.md -print` — no repo/container AGENTS instructions found.
- `git status --short` — clean before work.
- `sed -n '1,220p' README.md` — confirmed static-site workflow and local preview command.
- `git log -3 --oneline` — confirmed latest commit was `eade1c6 Align ships CTA in header`.
- `npx --yes playwright@1.54.2 install chromium` — passed; downloaded Chromium, ffmpeg, and Chromium headless shell to `/root/.cache/ms-playwright`; reported missing host dependencies.
- `npx --yes playwright@1.54.2 install-deps chromium` — passed; installed required Ubuntu browser host libraries and `xvfb`.
- `python3 -m http.server 8080` — started local static server.
- `curl -I http://127.0.0.1:8080/` — passed; returned HTTP 200 OK.
- `npx --yes playwright@1.54.2 screenshot --viewport-size=390,844 http://127.0.0.1:8080/ /tmp/tallships-header.png` — passed; captured screenshot.
- `ls -lh /tmp/tallships-header.png` — passed; screenshot file exists at 31K.
- `file /tmp/tallships-header.png` — failed because the `file` utility is not installed in this container; not needed after screenshot creation succeeded.

## Diff summary
- Documentation-only run log added.

## Risks
- Browser/runtime installation changed the current container environment, not the repository. A fresh container may still need the same `npx playwright install chromium` and `npx playwright install-deps chromium` commands unless the image is persisted upstream.
- The captured screenshot showed the static page rendered and the header CTA aligned; the map area displayed the app's fallback message because map tiles/Leaflet did not fully load during the quick smoke capture.

## Rollback
- Repository rollback: revert this documentation commit.
- Environment rollback, if needed: remove `/root/.cache/ms-playwright` and uninstall apt packages installed by Playwright; not performed because the user requested browser runtime installation.

## Commit / push status
- Commit pending at time of log creation.
- No push requested or performed.
