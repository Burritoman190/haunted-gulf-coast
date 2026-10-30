# 👻 Haunted Gulf Coast

A ghost-trip planner for Southeast Texas and Southwest Louisiana. It covers **Beaumont, Bridge City & Orange, Port Arthur and Lake Charles**.

Every stop on the map has a ghost story, rumor or ghost talk attached. Filter by city or by type of story, and build a road trip that opens in Google Maps.

## Features

- **Interactive map** (Leaflet + OpenStreetMap, no API key). Pin colors show the kind of story:
  - 🔴 Famous legend: a well-known named ghost story, such as Toni Jo Henry at the Calcasieu Courthouse or Sarah Jane Road
  - 🟣 Local rumor: witness reports, ghost-book listings or local hearsay
  - 🟢 Ghost tour or talk: tours, exhibits and talks where the local stories are told
- **Filters:** city, legend strength, "after dark" spots, hide private property, and full-text search
- **Trip builder:** add stops, reorder them, use "shortest order" (nearest-neighbor), see the distance, and open the route in Google Maps. The trip is saved in your browser.
- **Responsible-visiting info:** each place shows its access (open, events only, exterior only, private), a visit tip and source links. Private places can't be added to a trip.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Deploy

Every push to `main` builds the app and deploys it to GitHub Pages through `.github/workflows/deploy.yml`. To turn it on once, go to the repo's **Settings → Pages → Source → GitHub Actions**.

## Data

All locations are in [`src/data/locations.js`](src/data/locations.js), and each one cites its sources. The research was done in October 2026.

- Coordinates are approximate, so check addresses before you drive.
- Ghost stories are folklore, not verified fact.
- I found no rumors online for Bridge City itself, so that area uses nearby Orange County rumors, such as Wilkinson Cemetery and "Blood Road". Bridge City is a good fit for crowd-sourced stories (see the roadmap).

## Roadmap ideas

- Let users submit local ghost stories, with moderation
- Mark visits with "I felt something" check-ins and photos
- Add hours and event calendars, such as Halloween tours
- Add an audio-guide mode for night drives

## Tech

React 18 · Vite 5 · Leaflet / react-leaflet · GitHub Actions → GitHub Pages
