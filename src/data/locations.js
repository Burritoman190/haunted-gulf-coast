// Haunted & spooky spots around Beaumont, Bridge City, Port Arthur (TX) and Lake Charles (LA).
// Researched Oct 2026. Coordinates are approximate (street-level) — verify before driving.
//
// lore:
//   "documented"  – a named, widely repeated ghost story with local press / museum coverage
//   "local-lore"  – listed in regional ghost books or tours, but few specifics online
//   "atmosphere"  – historic or eerie spot; no specific ghost legend found
//
// access:
//   "open"        – public place or regular visiting hours
//   "event"       – only during tours / ticketed events
//   "exterior"    – view from outside / public road only
//   "restricted"  – private property; do not trespass

export const CITIES = [
  { id: 'beaumont', name: 'Beaumont, TX', center: [30.0802, -94.1266] },
  { id: 'bridge-city', name: 'Bridge City, TX', center: [30.0207, -93.8457] },
  { id: 'port-arthur', name: 'Port Arthur, TX', center: [29.8850, -93.9399] },
  { id: 'lake-charles', name: 'Lake Charles, LA', center: [30.2266, -93.2174] },
]

export const CATEGORIES = {
  house: { label: 'Historic house', icon: '🏚️' },
  theater: { label: 'Theater', icon: '🎭' },
  cemetery: { label: 'Cemetery', icon: '🪦' },
  civic: { label: 'Courthouse / library', icon: '⚖️' },
  landmark: { label: 'Landmark', icon: '🌉' },
  attraction: { label: 'Haunt / event', icon: '🎃' },
  tour: { label: 'Ghost tour', icon: '🕯️' },
}

export const LORE = {
  documented: { label: 'Documented legend', short: 'Legend' },
  'local-lore': { label: 'Local lore', short: 'Lore' },
  atmosphere: { label: 'Spooky vibes only', short: 'Vibes' },
}

export const ACCESS = {
  open: 'Open to visitors',
  event: 'Events / tours only',
  exterior: 'View from outside',
  restricted: 'Private — no entry',
}

export const LOCATIONS = [
  // ---------------- Beaumont ----------------
  {
    id: 'mcfaddin-ward',
    name: 'McFaddin-Ward House',
    city: 'beaumont',
    category: 'house',
    lat: 30.0866,
    lng: -94.1094,
    address: '1906 Calder Ave, Beaumont, TX',
    lore: 'documented',
    access: 'open',
    afterDark: false,
    story:
      'A 1906 Beaux-Arts mansion museum. Staff and visitors report footsteps, voices and phantom smells in the family rooms.',
    tip: 'Guided tours only; check the museum site for tour times.',
    sources: ['https://www.aswesawit.com/haunted-texas-sites/'],
  },
  {
    id: 'john-jay-french',
    name: 'John Jay French Museum',
    city: 'beaumont',
    category: 'house',
    lat: 30.1131,
    lng: -94.1319,
    address: '3025 French Rd, Beaumont, TX',
    lore: 'local-lore',
    access: 'open',
    afterDark: false,
    story:
      "An 1845 Greek Revival farmhouse, one of Beaumont's oldest homes. It appears in regional ghost books among the city's haunted spots.",
    tip: 'Small museum with limited hours. Call ahead.',
    sources: ['https://beta.thriftbooks.com/w/ghosts-of-beaumont-port-arthur-and-beyond_rita-cook/55104135'],
  },
  {
    id: 'tyrrell-library',
    name: 'Tyrrell Historical Library',
    city: 'beaumont',
    category: 'civic',
    lat: 30.0846,
    lng: -94.1003,
    address: '695 Pearl St, Beaumont, TX',
    lore: 'local-lore',
    access: 'open',
    afterDark: false,
    story:
      'An 1903 stone church that became a library. It is listed among Beaumont haunts in regional ghost books.',
    tip: 'Free and open during library hours. Look at the stained glass.',
    sources: ['https://beta.thriftbooks.com/w/ghosts-of-beaumont-port-arthur-and-beyond_rita-cook/55104135'],
  },
  {
    id: 'julie-rogers',
    name: 'Julie Rogers Theatre',
    city: 'beaumont',
    category: 'theater',
    lat: 30.0838,
    lng: -94.1012,
    address: '765 Pearl St, Beaumont, TX',
    lore: 'local-lore',
    access: 'event',
    afterDark: true,
    story:
      'A former 1927 city auditorium, now a performing-arts theater. Regional ghost books name it as one of the city\'s haunted venues.',
    tip: 'Inside access only with a show ticket.',
    sources: ['https://beta.thriftbooks.com/w/ghosts-of-beaumont-port-arthur-and-beyond_rita-cook/55104135'],
  },
  {
    id: 'jefferson-theatre',
    name: 'Jefferson Theatre',
    city: 'beaumont',
    category: 'theater',
    lat: 30.0822,
    lng: -94.1019,
    address: '345 Fannin St, Beaumont, TX',
    lore: 'atmosphere',
    access: 'event',
    afterDark: true,
    story:
      'A 1927 movie palace that closed in 1972 and was later restored. No specific ghost story was found, but it hosts Halloween film nights.',
    tip: 'Check for Halloween screenings in late October.',
    sources: ['https://en.wikipedia.org/wiki/Jefferson_Theatre', 'https://www.beaumontcvb.com/blog/post/spooky-season-activities/'],
  },
  {
    id: 'magnolia-cemetery',
    name: 'Magnolia Cemetery',
    city: 'beaumont',
    category: 'cemetery',
    lat: 30.0996,
    lng: -94.1020,
    address: '2291 Pine St, Beaumont, TX',
    lore: 'local-lore',
    access: 'open',
    afterDark: false,
    story:
      'Has burials from 1839 to today and more than 100,000 graves. A regional ghost book lists it among cemeteries said to hold "restless souls."',
    tip: 'Daylight hours only. Be respectful, since this is an active cemetery.',
    sources: ['https://atlas.thc.texas.gov/Details/7245001005'],
  },
  {
    id: 'spindletop-gladys-city',
    name: 'Spindletop-Gladys City Boomtown Museum',
    city: 'beaumont',
    category: 'attraction',
    lat: 30.0384,
    lng: -94.0743,
    address: '5550 Jimmy Simmons Blvd, Beaumont, TX',
    lore: 'atmosphere',
    access: 'event',
    afterDark: true,
    story:
      'A rebuilt 1901 oil-boom town. In October it holds a costumed living-history event where actors play departed members of the Chambers family.',
    tip: 'The October event is ticketed. This is theater, not a reported haunting.',
    sources: ['https://www.visithoustontexas.com/aroundhouston/blog/post/historical-halloween-in-beaumont/'],
  },
  {
    id: 'haunted-hotel',
    name: 'The Haunted Hotel',
    city: 'beaumont',
    category: 'attraction',
    lat: 30.0805,
    lng: -94.1030,
    address: '447 Orleans St, Beaumont, TX',
    lore: 'atmosphere',
    access: 'event',
    afterDark: true,
    story:
      'One of the longest-running haunted-house attractions in the country. Expect actors and jump scares rather than real ghosts.',
    tip: 'Open seasonal nights only. Buy tickets online for Halloween weekend.',
    sources: ['https://www.thescarefactor.com/haunted-house-directory/texas/The Haunted Hotel TX/'],
  },

  // ---------------- Bridge City / Orange area ----------------
  {
    id: 'rainbow-bridge',
    name: 'Rainbow Bridge',
    city: 'bridge-city',
    category: 'landmark',
    lat: 29.9815,
    lng: -93.8690,
    address: 'TX-87 over the Neches River (Port Arthur ↔ Bridge City)',
    lore: 'atmosphere',
    access: 'exterior',
    afterDark: true,
    story:
      'Built in 1938 and once the second-tallest bridge in America. Texas writers have called it "the scariest bridge in Texas" because of its steep climb, not because of ghosts.',
    tip: 'You can drive across, but there is no stopping or walking on the bridge.',
    sources: ['https://www.texasstandard.org/stories/this-is-the-scariest-bridge-in-texas/'],
  },
  {
    id: 'bridge-city-history',
    name: 'Old Prairie View (Bridge City) — submit a story',
    city: 'bridge-city',
    category: 'landmark',
    lat: 30.0207,
    lng: -93.8457,
    address: 'Bridge City, TX',
    lore: 'atmosphere',
    access: 'open',
    afterDark: false,
    story:
      'Bridge City was first called Prairie View. No ghost legend for the town was found online, so local stories may be waiting to be collected.',
    tip: 'Hackathon hook: this is a good place for crowd-sourced stories from residents.',
    sources: ['https://texasescapes.com/TexasGulfCoastTowns/BridgeCityTexas.htm'],
  },

  // ---------------- Port Arthur ----------------
  {
    id: 'hotel-sabine',
    name: 'Hotel Sabine',
    city: 'port-arthur',
    category: 'house',
    lat: 29.8686,
    lng: -93.9336,
    address: '600 Procter St, Port Arthur, TX',
    lore: 'local-lore',
    access: 'exterior',
    afterDark: true,
    story:
      'A 1929 downtown high-rise that regional ghost books list as one of Port Arthur\'s haunts.',
    tip: 'Best viewed from Procter Street. Check whether there is public access inside.',
    sources: ['https://beta.thriftbooks.com/w/ghosts-of-beaumont-port-arthur-and-beyond_rita-cook/55104135'],
  },
  {
    id: 'pompeiian-villa',
    name: 'Pompeiian Villa',
    city: 'port-arthur',
    category: 'house',
    lat: 29.8775,
    lng: -93.9294,
    address: '1953 Lakeshore Dr, Port Arthur, TX',
    lore: 'local-lore',
    access: 'open',
    afterDark: false,
    story:
      'A 1900 Pompeii-style villa that is a stop on the "Haunting of Port Arthur" self-guided ghost walk.',
    tip: 'House museum with limited hours. Combine it with the Lakeshore Drive walk.',
    sources: ['https://www.scavengerhunt.com/ghost-tour/port-arthur-tx'],
  },
  {
    id: 'vuylsteke-home',
    name: 'Vuylsteke Home',
    city: 'port-arthur',
    category: 'house',
    lat: 29.8765,
    lng: -93.9305,
    address: '1831 Lakeshore Dr, Port Arthur, TX',
    lore: 'local-lore',
    access: 'exterior',
    afterDark: true,
    story: 'A Dutch-built historic home on the same Lakeshore Drive ghost walk.',
    tip: 'View it from the sidewalk.',
    sources: ['https://www.scavengerhunt.com/ghost-tour/port-arthur-tx'],
  },
  {
    id: 'port-arthur-ghost-walk',
    name: '"Haunting of Port Arthur" Ghost Walk',
    city: 'port-arthur',
    category: 'tour',
    lat: 29.8720,
    lng: -93.9320,
    address: 'Downtown / Lakeshore Dr, Port Arthur, TX',
    lore: 'local-lore',
    access: 'open',
    afterDark: true,
    story:
      'A self-guided, app-based ghost tour of downtown Port Arthur, including the Pavilion, Pompeiian Villa and Vuylsteke Home.',
    tip: 'Do it anytime on your phone. A paid ticket is required.',
    sources: ['https://www.scavengerhunt.com/ghost-tour/port-arthur-tx'],
  },
  {
    id: 'sabine-pass-lighthouse',
    name: 'Sabine Pass Lighthouse',
    city: 'port-arthur',
    category: 'landmark',
    lat: 29.7339,
    lng: -93.8710,
    address: 'Lighthouse Rd, Cameron Parish, LA (across the pass)',
    lore: 'documented',
    access: 'restricted',
    afterDark: false,
    story:
      'In the 1960s, a caretaker reported repeated visits from a ghostly keeper in a dark suit with lighthouse insignia. After that, no caretakers were assigned to the station again.',
    tip: 'This is private property reached through an LNG terminal. View it from Sabine Pass Battleground on the Texas side.',
    sources: [
      'https://www.foghornpublishing.com/Digest/Photopage.cfm?Photo=139',
      'https://en.wikipedia.org/wiki/Sabine_Pass_Lighthouse',
    ],
  },

  // ---------------- Lake Charles ----------------
  {
    id: 'calcasieu-courthouse',
    name: 'Calcasieu Parish Courthouse',
    city: 'lake-charles',
    category: 'civic',
    lat: 30.2266,
    lng: -93.2174,
    address: '1000 Ryan St, Lake Charles, LA',
    lore: 'documented',
    access: 'exterior',
    afterDark: true,
    story:
      'Toni Jo Henry, the only woman executed in Louisiana\'s electric chair, died here on Nov 28, 1942. People report unexplained laughter, shadows and phantom scents.',
    tip: 'This is a working courthouse, so view the dome from outside after hours.',
    sources: [
      'https://www.kplctv.com/story/36513391/haunted-swla-the-toni-jo-henry-story/',
      'https://en.wikipedia.org/wiki/Toni_Jo_Henry',
    ],
  },
  {
    id: 'rosa-hart-theatre',
    name: 'Rosa Hart Theatre / Lake Charles Event Center',
    city: 'lake-charles',
    category: 'theater',
    lat: 30.2306,
    lng: -93.2228,
    address: '900 Lakeshore Dr, Lake Charles, LA',
    lore: 'documented',
    access: 'event',
    afterDark: true,
    story:
      'Home of the city\'s "Woman in White," who has reportedly been seen at weddings, art shows, performances and rehearsals.',
    tip: 'Catch a show for inside access. The lakefront is open to walk.',
    sources: ['https://visitlakecharles.org/blog/post/haunted-history-of-lake-charles'],
  },
  {
    id: 'imperial-calcasieu-museum',
    name: 'Imperial Calcasieu Museum & Sallier Oak',
    city: 'lake-charles',
    category: 'attraction',
    lat: 30.2153,
    lng: -93.2228,
    address: '204 W Sallier St, Lake Charles, LA',
    lore: 'local-lore',
    access: 'open',
    afterDark: false,
    story:
      'The museum runs a "Haunted Histories of SWLA" exhibit through Oct 31, 2026. Its grounds hold the Sallier Oak, which is about 375 years old and was the setting for past "Spirits Under the Oak" ghost-story nights.',
    tip: 'The exhibit closes on Halloween, so go now.',
    sources: [
      'https://imperialcalcasieumuseum.org/exhibit/haunted-histories-3/',
      'https://imperialcalcasieumuseum.org/the-sallier-oak/',
    ],
  },
  {
    id: 'sallier-barbe-house',
    name: 'Sallier-Barbe House',
    city: 'lake-charles',
    category: 'house',
    lat: 30.2165,
    lng: -93.2240,
    address: 'Shell Beach Dr area, Lake Charles, LA',
    lore: 'local-lore',
    access: 'restricted',
    afterDark: false,
    story:
      'The oldest house in Lake Charles. It is tied to legends of the pirate Jean Lafitte, who is said to have docked here in the early 1800s.',
    tip: 'This is a private residence. Learn the story but do not approach the house.',
    sources: ['https://visitlakecharles.org/blog/post/haunted-history-of-lake-charles'],
  },
  {
    id: 'spirit-guides-tour',
    name: 'Spirit Guides Downtown Ghost Tour',
    city: 'lake-charles',
    category: 'tour',
    lat: 30.2280,
    lng: -93.2170,
    address: 'Downtown Lake Charles, LA',
    lore: 'local-lore',
    access: 'event',
    afterDark: true,
    story:
      'A roughly 90-minute paranormal walking tour of downtown, created by a local team at the city\'s request.',
    tip: 'Check that the tour is still running and book ahead for Halloween weekend.',
    sources: ['https://www.kplctv.com/2025/04/11/is-lake-charles-haunted-new-attraction-takes-guests-paranormal-tour-downtown'],
  },

  // ---------------- Day-trip bonus ----------------
  {
    id: 'bragg-road',
    name: 'Bragg Road Ghost Light (Saratoga)',
    city: 'beaumont',
    category: 'landmark',
    lat: 30.3830,
    lng: -94.4920,
    address: 'Bragg Rd off FM 787, Saratoga, TX (~45 min from Beaumont)',
    lore: 'documented',
    access: 'exterior',
    afterDark: true,
    story:
      'An 8-mile dirt road on an old 1901 railroad spur in the Big Thicket. A mysterious light has been reported on it since the 1940s. The usual skeptical explanation is swamp gas.',
    tip: 'Go after dark and stay on the road. The surrounding land is private, with pipelines and deer stands.',
    sources: [
      'https://www.thestoryoftexas.com/discover/texas-story-project/bragg-lights-hardin-county',
      'https://bluebonnetnews.com/2026/06/17/bragg-light-road-continues-to-fuel-mystery-in-southeast-texas/',
    ],
  },
]
