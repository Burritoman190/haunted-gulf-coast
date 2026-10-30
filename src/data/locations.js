// Reportedly haunted places around Beaumont, Bridge City/Orange, Port Arthur (TX) and Lake Charles (LA).
// Every entry has a ghost story, rumor or ghost-talk attached — no "just creepy" spots.
// Researched Oct 2026. Coordinates are approximate (street-level) — verify before driving.
//
// lore:
//   "legend"  – well-known named ghost story with press / tourism / museum coverage
//   "rumor"   – local rumors, ghost-book listings or witness reports
//   "talk"    – ghost tours, talks and exhibits where the local stories are told
//
// access:
//   "open"        – public place or regular visiting hours
//   "event"       – only during tours / ticketed events
//   "exterior"    – view from outside / public road only
//   "restricted"  – private property; do not trespass

export const CITIES = [
  { id: 'beaumont', name: 'Beaumont, TX', center: [30.0802, -94.1266] },
  { id: 'bridge-city', name: 'Bridge City & Orange, TX', center: [30.0207, -93.8457] },
  { id: 'port-arthur', name: 'Port Arthur, TX', center: [29.8850, -93.9399] },
  { id: 'lake-charles', name: 'Lake Charles, LA', center: [30.2266, -93.2174] },
]

export const CATEGORIES = {
  house: { label: 'Historic house', icon: '🏚️' },
  hotel: { label: 'Hotel', icon: '🛏️' },
  theater: { label: 'Theater', icon: '🎭' },
  cemetery: { label: 'Cemetery', icon: '🪦' },
  civic: { label: 'Courthouse / library', icon: '⚖️' },
  road: { label: 'Road / tracks', icon: '🛤️' },
  landmark: { label: 'Landmark', icon: '🗼' },
  tour: { label: 'Ghost tour / talk', icon: '🕯️' },
}

export const LORE = {
  legend: { label: 'Famous legend', short: 'Legend' },
  rumor: { label: 'Local rumor', short: 'Rumor' },
  talk: { label: 'Ghost tour / talk', short: 'Tour' },
}

export const ACCESS = {
  open: 'Open to visitors',
  event: 'Events / tours only',
  exterior: 'View from outside',
  restricted: 'Private — no entry',
}

const CVB_SETX = 'https://www.beaumontcvb.com/blog/stories/post/the-five-most-historically-haunted-locations-in-setx/'
const CVB_BMT = 'https://www.beaumontcvb.com/blog/stories/post/haunted-beaumont/'
const HP_BMT = 'https://www.hauntedplaces.org/beaumont-tx/'
const COOK_BOOK = 'https://www.amazon.com/Ghosts-Beaumont-Arthur-Haunted-America/dp/1467170119'
const VISIT_LC = 'https://visitlakecharles.org/blog/post/haunted-history-of-lake-charles'
const KOGT = 'https://kogt.com/looking-back/'

export const LOCATIONS = [
  // ---------------- Beaumont ----------------
  {
    id: 'john-jay-french',
    name: 'John Jay French Museum',
    city: 'beaumont',
    category: 'house',
    lat: 30.1131,
    lng: -94.1319,
    address: '3025 French Rd, Beaumont, TX',
    lore: 'legend',
    access: 'open',
    afterDark: false,
    story:
      'This 1845 pioneer home is said to be haunted by "Charlie Yank," a carpetbagger killed on the stairs while trying to rob the house. People also talk about Electa Jane, the daughter John Jay French disowned, who vanished and was never heard from again.',
    tip: 'This is a small museum with limited hours, so call ahead. The family cemetery is on the grounds.',
    sources: [CVB_BMT],
  },
  {
    id: 'forest-lawn-kissing-statue',
    name: 'Forest Lawn "Kissing Statue"',
    city: 'beaumont',
    category: 'cemetery',
    lat: 30.1190,
    lng: -94.1050,
    address: '4955 Pine St, Beaumont, TX',
    lore: 'legend',
    access: 'open',
    afterDark: false,
    story:
      'The legend says that when you shine headlights on the statue of a couple, they turn and kiss. Visitors have also reported seeing a woman\'s silhouette in the doorway of a nearby house.',
    tip: 'This is an active cemetery, so visit during posted gate hours and be respectful.',
    sources: [CVB_BMT, HP_BMT],
  },
  {
    id: 'mcfaddin-ward',
    name: 'McFaddin-Ward House',
    city: 'beaumont',
    category: 'house',
    lat: 30.0866,
    lng: -94.1094,
    address: '1906 Calder Ave, Beaumont, TX',
    lore: 'rumor',
    access: 'open',
    afterDark: false,
    story:
      'This 1906 mansion museum is said to have footsteps, voices and phantom smells in the family rooms.',
    tip: 'You can only go inside on a guided tour, so check tour times first.',
    sources: ['https://www.aswesawit.com/haunted-texas-sites/'],
  },
  {
    id: 'spindletop-gladys-city',
    name: 'Spindletop-Gladys City Boomtown',
    city: 'beaumont',
    category: 'landmark',
    lat: 30.0384,
    lng: -94.0743,
    address: '5550 Jimmy Simmons Blvd (Lamar University), Beaumont, TX',
    lore: 'rumor',
    access: 'open',
    afterDark: false,
    story:
      'Visitors say an older one-armed man climbs into the driver\'s seat of oil pioneer Pattillo Higgins\'s old car and then vanishes. Others say they\'ve seen a man in period clothes driving it down Jimmy Simmons Blvd.',
    tip: 'This is a museum with daytime hours. Ask staff about the car.',
    sources: [CVB_SETX],
  },
  {
    id: 'sigep-house',
    name: 'Lamar University Sigma Phi Epsilon House',
    city: 'beaumont',
    category: 'house',
    lat: 30.0455,
    lng: -94.0790,
    address: '1325 W Virginia St, Beaumont, TX',
    lore: 'rumor',
    access: 'restricted',
    afterDark: false,
    story:
      'This former farmhouse was later said to be a brothel and is now a fraternity house. A friendly ghost called "Chester," believed to be the first owner, supposedly knocks, opens windows and flips the flag upside down.',
    tip: 'This is a private residence, so just know the story and don\'t knock.',
    sources: ['https://www.beaumontenterprise.com/news/article/Ghost-haunts-Lamar-fraternity-house-6577403.php', CVB_BMT],
  },
  {
    id: 'holiday-inn-11th',
    name: 'Former Holiday Inn on 11th Street',
    city: 'beaumont',
    category: 'hotel',
    lat: 30.0716,
    lng: -94.1335,
    address: '11th St at I-10, Beaumont, TX',
    lore: 'rumor',
    access: 'exterior',
    afterDark: true,
    story:
      'Staff reported objects moving on their own. A motion-activated camera recorded a shadow crossing a second-floor hallway that has no windows, and ghost hunters investigated.',
    tip: 'The hotel was reported closed for renovation, so look only from outside.',
    sources: [CVB_BMT, HP_BMT],
  },
  {
    id: 'tyrrell-library',
    name: 'Tyrrell Historical Library',
    city: 'beaumont',
    category: 'civic',
    lat: 30.0846,
    lng: -94.1003,
    address: '695 Pearl St, Beaumont, TX',
    lore: 'rumor',
    access: 'open',
    afterDark: false,
    story:
      'This 1903 stone church became a library. Rita Cook\'s "Ghosts of Beaumont, Port Arthur and Beyond" lists it as a haunted spot.',
    tip: 'It\'s free during library hours.',
    sources: [COOK_BOOK],
  },
  {
    id: 'julie-rogers',
    name: 'Julie Rogers Theatre',
    city: 'beaumont',
    category: 'theater',
    lat: 30.0838,
    lng: -94.1012,
    address: '765 Pearl St, Beaumont, TX',
    lore: 'rumor',
    access: 'event',
    afterDark: true,
    story: 'This 1927 former city auditorium is listed as haunted in Rita Cook\'s Southeast Texas ghost book.',
    tip: 'You need a show ticket to get inside.',
    sources: [COOK_BOOK],
  },
  {
    id: 'bragg-road',
    name: 'Bragg Road Ghost Light (Saratoga)',
    city: 'beaumont',
    category: 'road',
    lat: 30.3830,
    lng: -94.4920,
    address: 'Bragg Rd off FM 787, Saratoga, TX (~45 min from Beaumont)',
    lore: 'legend',
    access: 'exterior',
    afterDark: true,
    story:
      'A floating light has been reported on this dirt road since the 1940s. One story says it\'s the lantern of a railroad worker who was decapitated and is looking for his head. Another says it\'s a spirit searching for his murdered bride.',
    tip: 'Go after dark and stay on the road. The land on both sides is private, with pipelines and deer stands.',
    sources: [
      'https://www.thestoryoftexas.com/discover/texas-story-project/bragg-lights-hardin-county',
      'https://bluebonnetnews.com/2026/06/17/bragg-light-road-continues-to-fuel-mystery-in-southeast-texas/',
    ],
  },

  // ---------------- Bridge City / Orange area ----------------
  {
    id: 'wilkinson-cemetery',
    name: 'Wilkinson Cemetery (Little Cypress)',
    city: 'bridge-city',
    category: 'cemetery',
    lat: 30.1600,
    lng: -93.8200,
    address: 'Little Cypress, Orange County, TX (~15 min from Bridge City)',
    lore: 'rumor',
    access: 'open',
    afterDark: false,
    story:
      'A local history column says this is the Orange County site with the most ghost stories, including reports of green lights floating among the graves.',
    tip: 'Go only in daylight and respect the graves.',
    sources: [KOGT],
  },
  {
    id: 'blood-road',
    name: '"Blood Road" (Childers Road)',
    city: 'bridge-city',
    category: 'road',
    lat: 30.0700,
    lng: -93.7300,
    address: 'Childers Rd near the Port of Orange, Orange, TX',
    lore: 'rumor',
    access: 'exterior',
    afterDark: true,
    story:
      'An old Orange County tale says a pool of blood would appear on the road at night out by the Port of Orange.',
    tip: 'This is a working industrial area, so drive by without stopping.',
    sources: [KOGT],
  },

  // ---------------- Port Arthur ----------------
  {
    id: 'ghost-lady-7th',
    name: 'Ghost Lady of West 7th St',
    city: 'port-arthur',
    category: 'road',
    lat: 29.8800,
    lng: -93.9480,
    address: 'Tracks near W 7th St & W Railroad Ave, Port Arthur, TX',
    lore: 'legend',
    access: 'exterior',
    afterDark: true,
    story:
      'A woman is said to have been decapitated while crossing between the cars of a stopped train. Her ghost supposedly walks the tracks at night.',
    tip: 'Never walk on active railroad tracks. Watch from the street.',
    sources: ['https://www.hauntedplaces.org/item/ghost-lady-of-west-7th-st/'],
  },
  {
    id: 'sarah-jane-road',
    name: 'Sarah Jane Road',
    city: 'port-arthur',
    category: 'road',
    lat: 29.9860,
    lng: -93.9600,
    address: 'Sarah Jane Rd, Port Neches, TX (between Port Arthur & Beaumont)',
    lore: 'legend',
    access: 'exterior',
    afterDark: true,
    story:
      'Southeast Texas\'s best-known road legend says a young mother, Sarah Jane, took her own life after her baby drowned in the Neches River. Her ghost is said to still search the marsh for her child.',
    tip: 'This is a public road, so stay in your car and watch for traffic.',
    sources: [CVB_BMT, 'https://history.rediscoveringsetx.com/tag/ghost-road/', KOGT],
  },
  {
    id: 'mcfaddin-beach',
    name: 'McFaddin Beach',
    city: 'port-arthur',
    category: 'landmark',
    lat: 29.6600,
    lng: -94.1000,
    address: 'Gulf shore off TX-87, southwest of Sabine Pass, TX',
    lore: 'legend',
    access: 'open',
    afterDark: true,
    story:
      'People at bonfires report hearing screams, musket shots and cannon fire. Some say they\'ve seen ships with large sails coming toward shore at night. The story ties the beach to a Civil War prisoner camp.',
    tip: 'The beach is remote with no services. Check road conditions and tides first.',
    sources: [CVB_SETX],
  },
  {
    id: 'sabine-pass-lighthouse',
    name: 'Sabine Pass Lighthouse',
    city: 'port-arthur',
    category: 'landmark',
    lat: 29.7339,
    lng: -93.8710,
    address: 'Lighthouse Rd, Cameron Parish, LA (across the pass)',
    lore: 'legend',
    access: 'restricted',
    afterDark: false,
    story:
      'A caretaker in the 1960s reported repeated visits from a ghostly keeper in a dark suit, and no caretaker was assigned there again. Visitors also tell of soldier apparitions guarding the tower, campfire smoke and the sound of glasses clinking.',
    tip: 'It\'s private and reached through an LNG terminal. View it from the Texas side at Sabine Pass Battleground.',
    sources: ['https://www.foghornpublishing.com/Digest/Photopage.cfm?Photo=139', CVB_SETX],
  },
  {
    id: 'hotel-sabine',
    name: 'Hotel Sabine',
    city: 'port-arthur',
    category: 'hotel',
    lat: 29.8686,
    lng: -93.9336,
    address: '600 Procter St, Port Arthur, TX',
    lore: 'rumor',
    access: 'exterior',
    afterDark: true,
    story: 'This 1929 downtown high-rise is listed as one of Port Arthur\'s haunts in Rita Cook\'s Southeast Texas ghost book.',
    tip: 'It\'s best viewed from Procter Street.',
    sources: [COOK_BOOK],
  },
  {
    id: 'port-arthur-ghost-walk',
    name: '"Haunting of Port Arthur" Ghost Walk',
    city: 'port-arthur',
    category: 'tour',
    lat: 29.8775,
    lng: -93.9294,
    address: 'Downtown / Lakeshore Dr, Port Arthur, TX',
    lore: 'talk',
    access: 'open',
    afterDark: true,
    story:
      'This self-guided phone tour covers Port Arthur\'s haunted history and urban legends, with stops at the Pompeiian Villa, the Vuylsteke Home and the Pavilion.',
    tip: 'You can do it anytime, but it needs a paid ticket.',
    sources: ['https://www.letsroam.com/ghost-tour/port-arthur-tx', 'https://www.scavengerhunt.com/ghost-tour/port-arthur-tx'],
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
    lore: 'legend',
    access: 'exterior',
    afterDark: true,
    story:
      'Toni Jo Henry, the only woman executed in Louisiana\'s electric chair, died here on Nov 28, 1942. People report laughter, shadows and phantom scents, especially near the old holding cell.',
    tip: 'It\'s a working courthouse, so view the dome from outside after hours.',
    sources: [
      'https://www.kplctv.com/story/36513391/haunted-swla-the-toni-jo-henry-story/',
      'https://en.wikipedia.org/wiki/Toni_Jo_Henry',
    ],
  },
  {
    id: 'rosa-hart-theatre',
    name: 'Rosa Hart Theatre — "Elsie," the Woman in White',
    city: 'lake-charles',
    category: 'theater',
    lat: 30.2306,
    lng: -93.2228,
    address: '900 Lakeshore Dr, Lake Charles, LA',
    lore: 'legend',
    access: 'event',
    afterDark: true,
    story:
      'A jilted bride named Elsie is said to have walked off a long pier that once stood here. People say they\'ve seen her in white on the balcony during weddings, shows and rehearsals.',
    tip: 'Catch a show to get inside. The lakefront outside is open to walk.',
    sources: [VISIT_LC, 'https://www.postsouth.com/story/news/local/history/2026/10/16/what-are-the-most-haunted-places-in-louisiana-these-13-sites-known-for-ghosts-paranormal-stories/92267778007/'],
  },
  {
    id: 'big-woods-cemetery',
    name: 'Big Woods Cemetery (Vinton)',
    city: 'lake-charles',
    category: 'cemetery',
    lat: 30.2150,
    lng: -93.5900,
    address: '3925 Big Woods Cemetery Rd, Vinton, LA (~25 min west of Lake Charles)',
    lore: 'rumor',
    access: 'open',
    afterDark: false,
    story:
      'A dark shadow shaped like a man is said to guard the main gate. Visitors also report shadows and electrical interference. Stories about this cemetery have gone around for decades.',
    tip: 'Visit in daylight. It\'s the closest stop to the Texas border.',
    sources: [VISIT_LC, 'https://www.hauntedplaces.org/lake-charles-la/'],
  },
  {
    id: 'imperial-calcasieu-museum',
    name: 'Imperial Calcasieu Museum — "Haunted Histories of SWLA"',
    city: 'lake-charles',
    category: 'tour',
    lat: 30.2153,
    lng: -93.2228,
    address: '204 W Sallier St, Lake Charles, LA',
    lore: 'talk',
    access: 'open',
    afterDark: false,
    story:
      'This exhibit covers Southwest Louisiana legends, lore and lingering mysteries, including Big Woods Cemetery and the John Reid House. The museum has also hosted "Spirits Under the Oak" ghost-story nights under the 375-year-old Sallier Oak.',
    tip: 'The exhibit runs only through Oct 31, 2026, so go now.',
    sources: ['https://imperialcalcasieumuseum.org/exhibit/haunted-histories-3/', 'https://gator995.com/ghosts-haunting-lake-charles/'],
  },
  {
    id: 'spirit-guides-tour',
    name: 'Spirit Guides Downtown Ghost Tour',
    city: 'lake-charles',
    category: 'tour',
    lat: 30.2280,
    lng: -93.2170,
    address: 'Downtown Lake Charles, LA',
    lore: 'talk',
    access: 'event',
    afterDark: true,
    story:
      'This 90-minute paranormal walking tour of downtown is run by a local team and was created at the city\'s request.',
    tip: 'Check that it\'s still running, and book ahead for Halloween weekend.',
    sources: ['https://www.kplctv.com/2025/04/11/is-lake-charles-haunted-new-attraction-takes-guests-paranormal-tour-downtown'],
  },
]
