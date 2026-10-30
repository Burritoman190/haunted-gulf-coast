# 👻 Haunted Gulf Coast

**A ghost-trip planner for Southeast Texas and Southwest Louisiana.**
It maps 22 reportedly haunted places, local rumors and ghost tours across **Beaumont, Bridge City & Orange, Port Arthur and Lake Charles**. You can hear each legend read aloud and build a ghost-hunting road trip that opens in Google Maps. When you arrive, **check in with a photo** and Google's open **Gemma 4** model gives you a spooky paranormal reading of what's actually in your picture.

**Live demo:** https://burritoman190.github.io/haunted-gulf-coast/

![Intro screen](docs/intro.jpg)

![Map, fright meter and trip planner](docs/map.jpg)

<img src="docs/mobile.jpg" alt="Mobile view" width="320" />

---

## ✨ Features

| Feature | What it does |
|---|---|
| 📸 **Ghost check-in + Gemma 4 scan** | Snap a photo at a haunt. The app checks your GPS against the location (within 0.5 mi, or 2 mi for roads and beaches) to award a **verified** badge. Then **Gemma 4**, which can read images, looks at the real photo and returns a verdict, a 1–10 spook level, "anomalies" in the frame, a reading tied to the local legend, and whether the photo looks like the right place. You can hear the reading aloud too. |
| 🏅 **Haunted Passport** | Every check-in is saved as a stamp with a photo thumbnail and Gemma's verdict, with progress shown as "X/22 haunts, Y verified". |
| 🌫️ **Spooky intro** | A full-screen fog-and-moon landing page with a flickering title and an "Enter if you dare" button. |
| 🗺️ **Interactive dark map** | Glowing, pulsing pins colored by story type. Nearby pins group into ghost clusters. |
| 👻 **Fright meter** | Every place gets 1–5 ghosts, from "Faint chill" to "Terrifying". You can sort by **most haunted first**. |
| 🔊 **Tell me the story** | Reads each legend aloud with the browser's built-in voice, so it works on a night drive. |
| 📍 **Near me** | Uses your location to show how far each haunt is and sorts the closest first. |
| 🕯️ **Trip planner** | Add stops, reorder them or click **Shortest order**. The route draws on the map and opens in Google Maps. It's saved in your browser. |
| 🔎 **Filters** | Filter by city, story type, "after dark" spots or hiding private property, or use full-text search. |
| 🛡️ **Responsible visiting** | Each place shows how you can visit it (open, events only, outside only, or private) plus a visit tip and source links. Private places can't be added to a trip. |
| 📱 **Mobile friendly** | The layout adapts to phones with no sideways scrolling. |

### Story types (pin colors)
- 🔴 **Famous legend:** a well-known, named ghost story, such as Toni Jo Henry at the Calcasieu Courthouse, Sarah Jane Road or the Bragg Road light.
- 🟣 **Local rumor:** witness reports, listings in ghost books, or local hearsay.
- 🟢 **Ghost tour / talk:** tours, exhibits and talks where the local stories are told.

---

## 🧰 What I used

**Code & frameworks**
- [React 18](https://react.dev/) for the UI components and state
- [Vite 5](https://vitejs.dev/) for the dev server and production build
- [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/) for the interactive map
- [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) + [react-leaflet-cluster](https://github.com/akursat/react-leaflet-cluster) for the ghost clusters
- Plain CSS animations for the fog, flicker, pulsing pins and moving route (no UI library)

**Open-source AI**
- [**Gemma 4**](https://ai.google.dev/gemma), Google's open-weights model that can read images, called through the **free tier of the Gemini API**:
  - `gemma-4-26b-a4b-it` is the default. It's a mixture-of-experts model with only about 4B active parameters, so it's fast and cheap.
  - `gemma-4-31b-it` is the automatic fallback, and you can also pick it as the "smarter" option.
  - Thinking is set to `minimal` so readings come back quickly.
  - Photos are shrunk to 768 px in the browser before upload, which means fewer tokens and a faster scan.
  - A system prompt casts Gemma as "The Medium". It describes only what's actually in the photo, stays playful and family-friendly, and never claims ghosts are scientifically real.
  - **Bring your own key:** each user pastes a free key from [Google AI Studio](https://aistudio.google.com/apikey). It's stored only in their browser and sent only to Google. No key is ever put in the code.
  - **Demo mode** gives an offline reading, so the app still works with no key or connection.

**Browser APIs (free, no API keys)**
- **Web Speech API** (`speechSynthesis`) for the "Tell me the story" narration
- **Geolocation API** for the "Near me" button and on-site check-in checks
- **Canvas API** to shrink and compress photos before they're sent to Gemma
- **Camera capture** (`<input capture="environment">`) to snap photos on phones
- **localStorage** to save your trip, your Haunted Passport and your Gemini key on your device

**Data & services**
- [OpenStreetMap](https://www.openstreetmap.org/copyright) map tiles, styled dark with CSS
- Google Maps directions links for turn-by-turn routes (opened in a new tab)
- Location research from local tourism boards (Visit Beaumont CVB, Visit Lake Charles), local news (KPLC, Beaumont Enterprise, KOGT, American Press), museum sites, HauntedPlaces.org and Rita Cook's *Ghosts of Beaumont, Port Arthur and Beyond*. Each place links to its sources in the app.

**Tools**
- [Git](https://git-scm.com/) + [GitHub](https://github.com/) for version control
- [GitHub CLI](https://cli.github.com/) to create the repo
- [GitHub Actions](https://github.com/features/actions) + [GitHub Pages](https://pages.github.com/) to build and host the site on every push (`.github/workflows/deploy.yml`)
- [Claude Code](https://claude.com/claude-code) (Anthropic) as an AI pair programmer for research, coding and testing

---

## 🚀 Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:5173. To use Gemma ghost scans, click **🔮 Connect Gemma 4** and paste a free key from https://aistudio.google.com/apikey.

## 🌐 Deploy

Every push to `main` builds the site and publishes it to GitHub Pages. To set it up once, go to **Settings → Pages → Source** and choose **GitHub Actions**.

## 📂 Project structure

```
src/
  data/locations.js      # all 22 places, fright ratings and sources
  components/
    Intro.jsx            # fog landing screen
    MapView.jsx          # Leaflet map, glowing pins, clusters, route line
    LocationCard.jsx     # story card with fright meter and narration
    TripPanel.jsx        # trip builder
    FrightMeter.jsx
    CheckInModal.jsx     # location check -> snapshot -> Gemma 4 ghost scan
    Passport.jsx         # saved check-in stamps
    KeySettings.jsx      # paste your free Gemini API key, choose Gemma model
  lib/
    gemma.js             # Gemma 4 calls (Gemini API), fallback model, demo mode
    checkins.js          # GPS radius check and passport storage
    image.js             # in-browser photo resize/compress
    trip.js              # distance, shortest-order and Google Maps links
    narrate.js           # text-to-speech helper
```

## ⚠️ About the data

- These are **reported ghost stories and rumors**, not verified fact.
- Coordinates are approximate, so check addresses before you drive.
- Respect private property, cemeteries and posted hours. Never walk on active railroad tracks.
- I found no rumors online for Bridge City itself, so that area uses nearby Orange County rumors (Wilkinson Cemetery, "Blood Road").

## 🔮 Roadmap

- "Submit a ghost story" form so locals can add rumors, starting with Bridge City
- Preset themed routes, such as "Lake Charles After Dark"
- Photos for every location
- Installable phone app (PWA) with offline mode
