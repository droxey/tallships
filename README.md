# Sail Boston 2026 Tall Ships Map

Static, mobile-first Leaflet site for Sail Boston 2026 event leads.

## Files

- `index.html` — static HTML shell and CDN Leaflet includes
- `styles.css` — responsive map/list/detail-sheet UI
- `app.js` — local event data, markers, filter, list view, map/share/add-to-calendar buttons

## Deploy

Upload these files to any static host: GitHub Pages, Netlify static deploy, S3 static website, nginx, Apache, or plain file hosting.

No build step. No framework. No package install.

## Local preview

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Update event data

Edit the `EVENTS` array in `app.js`. Each event needs:

- `startDate` / `endDate`
- `title`
- `time`
- `type`
- `reservation`
- `address`
- `lat` / `lng`
- `sources`



## Calendar button

The **Calendar** button generates a standards-based `.ics` event file with title, date/time, location, notes, reservation status, maps link, and source links. Mobile browsers hand this file to the device calendar/import flow when supported.
