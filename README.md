# 👻 Haunted Gulf Coast

A ghost-trip planner for Southeast Texas and Southwest Louisiana. It covers **Beaumont, Bridge City, Port Arthur and Lake Charles**.

Browse 21 eerie spots on a map, filter by city or by how strong the legend is, and build a road trip that opens in Google Maps.

## Features

- **Interactive map** (Leaflet + OpenStreetMap, no API key). Pin colors show legend strength:
  - 🔴 Documented legend: a named ghost story with press or museum coverage, such as Toni Jo Henry at the Calcasieu Courthouse
  - 🟣 Local lore: listed in regional ghost books or tours
  - 🟢 Spooky vibes only: a historic or eerie place with no specific ghost story found
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
- No ghost legend for Bridge City itself was found online. That makes it a good fit for crowd-sourced stories (see the roadmap).

## Roadmap ideas

- Let users submit local ghost stories, with moderation
- Mark visits with "I felt something" check-ins and photos
- Add hours and event calendars, such as Halloween tours
- Add an audio-guide mode for night drives

## Tech

React 18 · Vite 5 · Leaflet / react-leaflet · GitHub Actions → GitHub Pages
